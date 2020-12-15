const path = require('path')

const project = process.cwd() // 项目目录

const config = {
  project, // 项目目录
  config: path.join(__dirname), // 配置文件目录
  src: path.join(project, './src/'), // 源文件目录
  build: path.join(project, './dist/'), // 打包目录
  html: path.join(project, './src/pages/'), // html文件目录
  vendors: path.join(project, './src/vendors/'), // vendors目录
  node_modules: path.join(project, './node_modules/'), // node_modules目录
  ignorePages: [''] // 标识没有入口js文件的html
}

module.exports = config