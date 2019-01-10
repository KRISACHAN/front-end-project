// 生产环境配置
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const uglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const webpackBase = require('./webpack.config.base.js')
const config = require('./config.js')

const cssExtracter = new ExtractTextWebpackPlugin({
  filename: './css/[name]-css.[contenthash:8].css',
  allChunks: true
})
const sassExtracter = new ExtractTextWebpackPlugin({
  filename: './css/[name]-sass.[contenthash:8].css',
  allChunks: true
})
const lessExtracter = new ExtractTextWebpackPlugin({
  filename: './css/[name]-less.[contenthash:8].css',
  allChunks: true
})

const webpackProd = {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:8].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [config.src],
        exclude: [config.vendors],
        use: cssExtracter.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                minimize: true
              }
          }, 'postcss-loader'],
          publicPath: '../'
        })
      },
      {
        test: /\.scss$/,
        include: [config.src],
        exclude: [config.vendors],
        use: sassExtracter.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                  minimize: true
              }
          }, 'postcss-loader', 'sass-loader'],
          publicPath: '../'
        })
      },
      {
        test: /\.less$/,
        include: [config.src],
        exclude: [config.vendors],
        use: lessExtracter.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                  minimize: true
              }
          }, 'postcss-loader', 'less-loader'],
          publicPath: '../'
        })
      }
    ]
  },
  plugins: [
    cssExtracter,
    sassExtracter,
    new webpack.HashedModuleIdsPlugin(),
    new cleanWebpackPlugin(['./dist/'], {
      root: config.project
    }),
    new uglifyJSPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
}

module.exports = webpackMerge(webpackBase, webpackProd)