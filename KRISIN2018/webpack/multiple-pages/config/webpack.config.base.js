const path = require('path')
const fs = require('fs')
const config = require('./config.js')
const HTMLWebpackPlugin = require('html-webpack-plugin')

// 获取html文件名，生成多页面入口
const getPagesEnter = path => {
  const dirArr = fs.readdirSync(path)
  console.log(path)
  const filesArr = dirArr.filter(e => e.indexOf('html') >= 0).map(e => e.replace('.html', ''))  
  return filesArr
}

const HTMLArr = getPagesEnter(config.html)
const HTMLPlugins = [] // 保存HTMLWebpackPlugin实例
const Entries = {} // 保存入口列表

// 生成HTMLWebpackPlugin实例和入口列表
HTMLArr.forEach(page => {
  console.log(page)
  const htmlConfig = {
    filename: `${page}.html`,
    template: path.join(config.html, `./${page}.html`) // 模板文件
  }
  const hasIgnorePages = config.ignorePages.findIndex(val => val === page)
  if (hasIgnorePages === -1) {
    // 有入口js文件的html，添加本页的入口js和公用js，并将入口js写入Entries中
    htmlConfig.chunks = [page, 'commons']
    Entries[page] = `./src/js/${page}.js`
  } else {
    // 没有入口js文件，chunk为空
    htmlConfig.chunks = []
  }
  const htmlPlugin = new HTMLWebpackPlugin(htmlConfig)
  HTMLPlugins.push(htmlPlugin)
})

const baseConfig = {
  context: config.project, // 入口、插件路径会基于context查找
  entry: Entries,
  output: {
    path: config.build // 打包路径
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: [config.src],
        exclude: [config.vendors],
        use: [
          {
            loader: 'file-loader',
            options: {
                name: 'fonts/[name]-[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /(\.jsx|\.js)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: [config.src],
        exclude: [config.node_modules, config.vendors]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg|webp)$/,
        include: [config.src],
        exclude: [config.vendors],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'img/[name]-[hash].[ext]',
              fallback: 'file-loader'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...HTMLPlugins
  ]
}

module.exports = baseConfig