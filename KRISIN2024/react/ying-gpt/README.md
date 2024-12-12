# Simple GPT

一个简单但功能完整的 ChatGPT 聊天机器人。基于 React + TypeScript + Vite + Material UI 构建。

## ✨ 特性

-   💡 基于 React + TypeScript 开发
-   🎨 使用 Material UI + Tailwind CSS 构建界面
-   🚀 Vite 构建，快速的开发体验
-   🔑 支持自定义 API Key
-   📝 打字机效果的消息显示
-   🌓 支持亮色/暗色主题切换
-   💬 完整的对话上下文管理
-   📱 响应式设计，支持移动端
-   🔧 完善的工程化配置

## 🛠️ 技术栈

-   React 18
-   TypeScript 5
-   Material UI 5
-   Tailwind CSS 3
-   Vite 5
-   ESLint + Prettier + Stylelint
-   Husky + lint-staged + commitlint
-   Docker + DevContainer

## 🚀 快速开始

### 环境要求

-   Node.js 20+
-   pnpm 9.1+

### 开发环境

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 代码检查
pnpm lint

# 代码格式化
pnpm prettier

# 提交代码
pnpm commit
```

### 生产环境

```bash
# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

### Docker 部署

```bash
# 构建镜像
docker build -t simple-gpt .

# 运行容器
docker run -d -p 80:80 simple-gpt
```

## 📁 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 组件
│   ├── Chat/       # 聊天相关组件
│   ├── Layout/     # 布局组件
│   └── Settings/   # 设置相关组件
├── contexts/       # React Context
├── hooks/          # 自定义 Hooks
├── types/          # TypeScript 类型定义
└── utils/          # 工具函数
```

## 🔧 工程化配置

### 代码规范

-   ESLint：JavaScript/TypeScript 代码检查
-   Prettier：代码格式化
-   Stylelint：CSS/SCSS 代码检查
-   EditorConfig：编辑器配置统一

### Git 工作流

-   Husky：Git hooks 管理
-   lint-staged：暂存代码检查
-   commitlint：提交信息规范
-   cz-git：交互式提交

### 构建优化

-   代码分割：React、MUI、Markdown 分包
-   资源优化：图片、CSS、JS 分类打包
-   生产优化：Tree-shaking、压缩、Polyfill

### 开发体验

-   DevContainer：开发环境容器化
-   VS Code 配置：推荐插件、调试配置
-   Docker：开发和生产环境支持

## 📝 提交规范

使用 `pnpm commit` 提交代码，支持以下类型：

-   feat: 新功能
-   fix: 修复
-   docs: 文档变更
-   style: 代码格式
-   refactor: 重构
-   perf: 性能优化
-   test: 增加测试
-   chore: 构建过程或辅助工具的变动
-   revert: 回退
-   build: 打包

## 📄 License

[MIT](./LICENSE)
