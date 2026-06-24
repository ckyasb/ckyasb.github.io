#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
mkdocs2obsidian.py — 把 MkDocs Material 风格的 markdown 转成 Obsidian 友好的格式。

转换规则（按行状态机处理，正确嵌套）：
  1. `??? note "标题"`     -> `> [!note]- 标题`      （折叠，默认收起）
     `??? note`            -> `> [!note]-`            （无标题折叠）
     `???+ note "标题"`    -> `> [!note]+ 标题`       （折叠，默认展开）
  2. `!!! note "标题"` / `!!! important "..."` 等
                          -> `> [!note] 标题`        （普通展开 callout）
     `!!! important`      -> `> [!important]`
  3. callout 内部每一行加 `> ` 前缀；callout 内的 callout 用 `>> ` `>>> `（自动处理嵌套）。
  4. callout 内容里的 `??? note` / `!!!` 嵌套块再缩进一层。
  5. 其他内容（标题、段落、$$ 公式块、表格、代码块、列表）原样保留。
  6. 行内 `??? note` 仅在行首（可前导空白）匹配，不误伤正文。

用法:
    python3 mkdocs2obsidian.py <input.md> [output.md]
    python3 mkdocs2obsidian.py --dir <dir>        # 递归转换目录下所有 .md（原地）
    python3 mkdocs2obsidian.py --dir <src> --out <dst>  # 转换到另一目录
"""
import os
import re
import sys

# ---------------------------------------------------------------------------
# 工具函数
# ---------------------------------------------------------------------------

def detect_indent(line):
    """返回 (缩进空格数, 去缩进后的内容)。"""
    m = re.match(r'^(\s*)(.*)$', line)
    return len(m.group(1)), m.group(2)


def callout_type_and_title(tag):
    """`??? note` / `??? note "标题"` / `!!! important "标题"` -> (fold, type, title, keep_default_expand)
    fold: '-' 收起, '+' 展开, '' 不折叠(普通 callout)
    """
    m = re.match(r'^([?]{3}\s*[-+]?|!{3})\s+(\w+)(?:\s+"(.*)")?\s*$', tag.strip())
    if not m:
        return None
    marker, ctype, title = m.group(1), m.group(2), m.group(3)
    title = title or ''
    if marker.startswith('?'):
        # 折叠 callout
        if marker.endswith('+'):
            fold, default_exp = '+', True
        elif marker.endswith('-'):
            fold, default_exp = '-', False
        else:
            # ??? note （无 +/-）默认折叠收起
            fold, default_exp = '-', False
        return (fold, ctype, title, True)
    else:
        # !!! 普通展开 callout
        return ('', ctype, title, False)


def transform_inline_admonitions_in_text(text):
    """正文里偶发的 `!!! note 行内` 等不做处理；只处理块级。这里返回原样。"""
    return text


# ---------------------------------------------------------------------------
# 主转换：基于 token 流 + 栈
# ---------------------------------------------------------------------------

def convert(text):
    lines = text.split('\n')
    out = []
    # callout 栈：每项是 dict(fold, ctype, title, depth, is_collapsed_block, list_indent)
    # depth: 嵌套深度（顶层=1）
    # 我们用一个栈记录当前所有打开的 callout；每行输出前要根据栈深度加对应数量 '> '
    stack = []   # list of (fold, ctype, title, depth)

    def quote_prefix():
        return ''.join('> ' for _ in stack)

    i = 0
    n = len(lines)
    while i < n:
        raw = lines[i]
        indent, content = detect_indent(raw)

        # 检测 callout 开始行：必须是某 callout 标记独占一行（可前导空白）。
        # 形如:  ??? note   /  ??? note "x"  /  ???+ note   /  !!! note  /  !!! important "y"
        m = re.match(r'^(\s*)([?]{3}\s*[-+]?|!{3})\s+(\w+)(?:\s+"(.*)")?\s*$', raw)
        if m:
            lead = m.group(1)
            tag = m.group(2) + ' ' + m.group(3)
            if m.group(4) is not None:
                tag += ' "' + m.group(4) + '"'
            info = callout_type_and_title(tag)
            if info:
                fold, ctype, title, is_collapsed = info
                depth = len(stack) + 1
                # 生成 callout 头
                if is_collapsed:
                    head = f'{lead}{quote_prefix()}> [{ctype}]{fold}'
                else:
                    head = f'{lead}{quote_prefix()}> [{ctype}]'
                if title:
                    head += ' ' + title
                out.append(head)
                stack.append((fold, ctype, title, depth, lead))
                i += 1
                continue

        # 检测 callout 内容是否结束：callout 内容必须比头更缩进（或为空行）。
        # MkDocs 的规则：内容缩进 >= 头缩进 + 4 空格，或为空行。
        # 从最内层往外：找到第一个 callout 其 (头缩进+4) <= 行缩进，之前更内层的全部弹出。
        while stack:
            top = stack[-1]
            required_indent = len(top[4]) + 4   # 内容需比头多缩进 4
            if content == '':
                # 空行：属于当前 callout（callout 内空行合法），输出带前缀的空行
                out.append(quote_prefix().rstrip())
                break
            if indent >= required_indent:
                # 属于当前 callout 内容：去掉 required_indent 个前导空格，加 quote 前缀
                inner = raw[required_indent:] if len(raw) >= required_indent else raw.lstrip()
                out.append(quote_prefix() + inner)
                break
            else:
                # 不属于当前 callout，结束它
                stack.pop()
                continue
        else:
            # 栈空，直接输出
            out.append(raw)

        i += 1

    return '\n'.join(out)


# ---------------------------------------------------------------------------
# 命令行入口
# ---------------------------------------------------------------------------

def convert_file(src, dst=None):
    with open(src, 'r', encoding='utf-8') as f:
        text = f.read()
    new = convert(text)
    if dst is None:
        dst = src
    with open(dst, 'w', encoding='utf-8') as f:
        f.write(new)
    return dst


def convert_dir(src_dir, out_dir):
    count = 0
    for root, dirs, files in os.walk(src_dir):
        # 跳过 .obsidian / .git / node_modules
        dirs[:] = [d for d in dirs if d not in ('.obsidian', '.git', 'node_modules', '.smart-env')]
        for fn in files:
            if not fn.endswith('.md'):
                continue
            src = os.path.join(root, fn)
            rel = os.path.relpath(src, src_dir)
            dst = os.path.join(out_dir, rel)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            convert_file(src, dst)
            count += 1
    return count


if __name__ == '__main__':
    args = sys.argv[1:]
    if len(args) >= 2 and args[0] == '--dir':
        src = args[1]
        if len(args) >= 4 and args[2] == '--out':
            out = args[3]
        else:
            out = src
        n = convert_dir(src, out)
        print(f'转换完成：{n} 个文件  {src} -> {out}')
    elif len(args) >= 1:
        src = args[0]
        dst = args[1] if len(args) >= 2 else src
        convert_file(src, dst)
        print(f'转换完成：{src} -> {dst}')
    else:
        print(__doc__)
        sys.exit(1)
