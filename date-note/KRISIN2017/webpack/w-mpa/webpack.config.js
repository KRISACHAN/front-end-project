const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackDevMiddleware = require('webpack-dev-middleware')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// webpack 打包配置
const config = {
  devtool: 'eval-source-map', // 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度
  entry: {
    main: './src/main.js',
    index: './src/index/index.js',
    log: './src/pages/log/log.js'
  }, // 入口，需要打包的文件
  output: {
    filename: 'js/[name]-[hash].js', // 打包后文件
    path: path.resolve(__dirname, 'dist') // 打包后路径
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // 本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true, //可以监控js变化
    hot: true // 热启动
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/ //不用babel编译的文件夹
      },
      {
        test: /\.css$/,
        //打包CSS文件的配置
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: false,
                minmize: false
              }
            },
            {
              loader: 'postcss-loader'
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    //配置打包页面
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template: path.resolve(__dirname, 'tpl/tpl.html'),
      chunks: ['main', 'index']
    }),
    new HtmlWebpackPlugin({
      title: 'log',
      filename: 'pages/log.html',
      template: path.resolve(__dirname, 'tpl/tpl.html'),
      chunks: ['main', 'log']
    }),
    // 为组件分配ID
    new webpack.optimize.OccurrenceOrderPlugin(),
    //压缩JS代码
    new webpack.optimize.UglifyJsPlugin(),
    //热加载
    new webpack.HotModuleReplacementPlugin(),
    //给生成的JS添加注释
    new webpack.BannerPlugin('这是来自kris的mpa-demo'),
    //给CSS打包出来
    new ExtractTextPlugin({
      filename: 'css/[name]-[hash].css'
    })
  ]
}

module.exports = config