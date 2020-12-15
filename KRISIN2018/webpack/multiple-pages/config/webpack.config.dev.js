// 开发环境配置
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const path = require('path')

const webpackBase = require('./webpack.config.base.js')
const config = require('./config.js')

const webpackDev = {
  output: {
    filename: 'js/[name].[hash:8].bundle.js'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist/',
    historyApiFallback: true, 
    overlay: true,
    inline: true,
    hot: true,
    host: "0.0.0.0",
    port: "8082",
    useLocalIp: true,
    proxy: {}
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [config.src],
        exclude: [config.vendors],
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        include: [config.src],
        exclude: [config.vendors],
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        include: [config.src],
        exclude: [config.vendors],
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = webpackMerge(webpackBase, webpackDev)