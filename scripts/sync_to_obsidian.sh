#!/usr/bin/env bash
# 把 MkDocs 三门课笔记同步（转换）到 Obsidian vault
# 用法: bash scripts/sync_to_obsidian.sh
set -e
MKDOCS=/home/ckyasb/ckyasb.github.io
VAULT=/mnt/d/obsidian/笔记
CONV=$MKDOCS/scripts/mkdocs2obsidian.py

declare -A MAP=(
  ["docs/Physics/广义相对论"]="$VAULT/相对论"
  ["docs/Physics/电动力学"]="$VAULT/电动力学"
  ["docs/CS/数据结构基础"]="$VAULT/fds"
)
count=0
for src in "${!MAP[@]}"; do
  dst="${MAP[$src]}"
  mkdir -p "$dst"
  for f in "$src"/*.md; do
    [ -f "$f" ] || continue
    bn=$(basename "$f")
    [ "$bn" = "index.md" ] && out="$dst/00 索引.md" || out="$dst/$bn"
    python3 "$CONV" "$f" "$out" >/dev/null
    count=$((count+1))
  done
done
echo "✅ 已同步 $count 个文件到 $VAULT"
