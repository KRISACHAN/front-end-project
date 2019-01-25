const path = require('path');
const project = process.cwd(); // 项目目录
const resolve = dir => path.join(__dirname, '..', dir); // 获取文件夹

const config = {
  project, // 项目目录
  config: path.resolve(__dirname, '../'), // 配置文件目录
  devAlias: {
    '@': resolve('src'),
    'test': resolve('test'),
    'core': resolve('core'),
    'libs': resolve('libs'),
    'static': resolve('static')
  }, // 开发环境的文件简写
  devInclude: [resolve('src'), resolve('test'), resolve('core'), resolve('static')], // 开发环境处理的文件夹
  devExclude: [resolve('node_modules')], // 开发环境不处理的文件夹
  src: resolve('src'), // 源文件目录
  build: resolve('dist'), // 打包目录
  html: resolve('views'), // html文件目录
  node_modules: resolve('node_modules'), // node_modules目录
  static: resolve('static'), // 静态资源文件夹
  ignorePages: [''] // 标识没有入口js文件的html
};

module.exports = config;