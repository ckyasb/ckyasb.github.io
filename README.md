# ckyasb 的数字花园

基于 MkDocs Material 的课程笔记站，包含课程导航、精选阅读、复习入口与希儿阅读伙伴。

## 本地预览

沿用本机已有的 miniconda Python 与 MkDocs 环境，更新时间依赖 `mkdocs-git-revision-date-localized-plugin=1.2.9`（通过 miniconda 安装）：

```bash
NOTE_PYTHON=/home/ckyasb/miniconda/envs/hpc101-docs/bin/python
"$NOTE_PYTHON" -m mkdocs serve --dev-addr=127.0.0.1:8000
```

访问 `http://127.0.0.1:8000/`。构建命令为 `"$NOTE_PYTHON" -m mkdocs build`，产物默认写入已被 Git 忽略的 `site/`。发布沿用 `.github/workflows/publish.yml`，发布配置已加入完整 Git 历史与更新时间插件依赖。

## 维护内容与样式

- `docs/index.md`：首页介绍、学科入口、精选阅读和复习链接，直接编辑 Markdown 即可维护。
- `docs/about.md`：个人介绍、使用说明和角色素材署名。
- `docs/stylesheets/extra.css`：浅色 / 深色主题、阅读排版、移动布局和角色样式。
- `docs/javascripts/seele-companion.js`：希儿的原创台词、阅读进度提醒、蝴蝶特效和偏好设置。
- `docs/assets/characters/`：本地角色图片与原创蝴蝶 SVG 图标。
- `mkdocs.yml`：搜索插件、`md_in_html`、样式表与脚本入口。继续使用 `awesome-pages` 自动生成课程导航。

首页布局中的 Markdown 使用 `markdown` 属性交给 `md_in_html` 处理，课程链接保持相对于 `docs/` 的 `.md` 路径，由 MkDocs 生成最终 URL。现有课程目录及正文链接未移动。首页只使用本地系统字体，不再请求 Google Fonts。

## 阅读伙伴

- 点击希儿会轮换台词；按钮也支持键盘 Enter / Space。
- 页面可滚动距离达到 800 像素时，在阅读进度 25%、55%、85% 触发提醒，两次对话至少间隔 12 秒。跳过多个进度时仅提示当前进度。
- 对话在 6.5 秒后消失，也可点关闭按钮或按 Escape。搜索和移动导航打开时隐藏角色。
- 「收起」与「蝴蝶：开 / 关」使用 `localStorage` 保存，键名为 `garden.companions-collapsed` 和 `garden.butterflies-enabled`。存储不可用时保持本页交互，并输出说明。
- 鼠标保留系统指针，14 只小蝴蝶游走，靠近鼠标后逐个跟随。点击产生短暂粒子；拖动选择文本、表单输入与触屏操作不触发粒子。
- 开启系统「减少动态效果」时禁用动画、蝴蝶群与点击粒子，保留对话。打印时不显示角色。
- 角色图片从本站加载；没有外部聊天服务、追踪脚本或额外前端框架。台词通过 `textContent` 插入。

## 素材来源

角色及原始美术属于《崩坏3》及其权利方。以下是来源记录，不代表这些角色素材适用本仓库代码的任何许可。

| 本地文件 | 来源 | 本地处理 |
|---|---|---|
| `seele-rebirth-animated.webp`、`seele-rebirth-still.webp` | [xinna2001/Seele](https://github.com/xinna2001/Seele)，详见下方固定版本与许可证说明 | 等比缩小、转换为透明 WebP 动画及静态首帧 |
| `butterfly-blue.svg`、`butterfly-red.svg` | 本站绘制的蝴蝶图标 | 32 × 32 首页与点击装饰 |

角色台词为本站原创，并非游戏原台词。替换图片时保留透明背景及相同文件名，或同步修改脚本中的路径。

## 浏览器验证

`scripts/verify_site.mjs` 使用 Chromium DevTools Protocol 检查真实浏览器，不需要安装 npm 包。使用 Node.js 20 的 `--experimental-websocket`，或提供原生 `WebSocket` 的更新版本。先启动本地预览，再运行：

```bash
node --experimental-websocket scripts/verify_site.mjs \
  http://127.0.0.1:8000/ \
  /home/ckyasb/.cache/puppeteer/chrome/linux-150.0.7871.24/chrome-linux64/chrome
```

最后一个参数可以替换为本机 Chromium 路径。脚本在临时目录启动独立浏览器配置，结束后关闭浏览器，保留截图供检查。测试覆盖中文搜索、希儿台词、键盘操作、粒子清理、设置持久化、滚动冷却、数学公式、手机布局、减少动画和存储不可用场景。

现有笔记中有两处与本次改动无关的构建告警：`Physics/选修/核反应堆.md` 引用了缺失的 `assets/反应堆/PWR.png`；毛概课程首页中专题一的链接文件名与实际文件名不一致。

## 蝴蝶群与更新时间

`docs/javascripts/butterfly-swarm.js` 参考 cursor-effects Ants 的游走、邻近聚集与跟随行为，使用本站 SVG 蝴蝶、本地独立实现，不加载第三方运行时。鼠标离开、后台标签或搜索打开时暂停；关闭开关时清理监听和动画。右下角希儿采用 `xinna2001/Seele` 的透明 Q 版半身动画，黑希已从页面移除。

更新时间插件使用 Git 提交日期，以中文、Asia/Shanghai 时区显示。未提交的工作区修改不会改变日期，禁止把构建日期作为兜底。线上已配置 checkout 的 `fetch-depth: 0`，并在依赖列表加入 `mkdocs-git-revision-date-localized-plugin==1.2.9`。

## 希儿动画素材

来源：<https://github.com/xinna2001/Seele/blob/d34179e52d0d80e8acf8781615292ae11a5ed825/image/bss.gif>。
上游提交固定为 `d34179e52d0d80e8acf8781615292ae11a5ed825`；其 MIT 许可证原文保存在 `docs/assets/characters/seele-source-LICENSE.txt`（Copyright 2022 PYmili）。角色及原始美术仍属于各自权利方，仓库未单独注明 GIF 的绘制作者。

本地将原 480×452、9 帧 GIF 等比缩至 192×181，保留透明通道与每帧 110ms 时长，输出 `seele-rebirth-animated.webp`；首帧输出 `seele-rebirth-still.webp`。开启减少动态效果、收起、打开搜索／导航、进入后台时切换静态文件，恢复时切回动画。右下角点击和滚动台词不变，不依赖上游 PyQt 或 RPA 程序。
