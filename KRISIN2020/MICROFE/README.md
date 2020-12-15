# ying-micro-fe-demo
> 基于 `vue 2` +  `web components` + `lit-html` 的微前端 demo。

## 实现思路

将 `vue` 应用打包成 `web components` ，通过 `lit-html` 将其渲染至入口应用页面中

## 优势

`web components` 的优势是可以做到应用隔离，内部与外部环境互不干扰，代码独立，样式，功能隔离。

以 `cdn` 的形式插入可以做到 应用自治，不影响主应用。

不限技术栈。

原生支持。

## 不足之处

将 `vue` 打包成 `web componets` , `vue` 是外置的，需要全局引入 `vue`。（与 `vue` 一起二次打包？）

兼容性  **IE 11 +** ，在低版本浏览器使用需要添加 **polyfill** 。（我们要考虑的兼容性？）

`window` 环境不隔离（使用快照管理？）

改造方式比较麻烦，`vue-cli` 支持打包成 `web components`，`@hello` 是否可以快速支持？