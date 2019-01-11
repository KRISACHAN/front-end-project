// 生产环境配置
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const uglifyJSPlugin = require('uglifyjs-webpack-plugin')
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpackBase = require('./webpack.config.base.js')
const config = require('./config.js')

// const cssExtracter = new ExtractTextWebpackPlugin({
//   filename: './css/[name]-css.[contenthash:8].css',
//   allChunks: true
// })
// const sassExtracter = new ExtractTextWebpackPlugin({
//   filename: './css/[name]-sass.[contenthash:8].css',
//   allChunks: true
// })
// const lessExtracter = new ExtractTextWebpackPlugin({
//   filename: './css/[name]-less.[contenthash:8].css',
//   allChunks: true
// })

const webpackProd = {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:8].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
//       {
//         test: /\.css$/,
//         include: [config.src],
//         exclude: [config.vendors],
//         use: ExtractTextWebpackPlugin.extract({
//           fallback: {
//             loader: 'style-loader',
//               options: {
//                 singleton: true
//               }
//           },
//           use: [{
//               loader: 'css-loader',
//               options: {
//                 minimize: true
//               }
//           }, 'postcss-loader'],
//           publicPath: '../'
//         })
//       },
//       {
//         test: /\.scss$/,
//         include: [config.src],
//         exclude: [config.vendors],
//         use: ExtractTextWebpackPlugin.extract({
//           fallback: {
//             loader: 'style-loader',
//               options: {
//                 singleton: true
//               }
//           },
//           use: [{
//               loader: 'css-loader',
//               options: {
//                 minimize: true
//               }
//           }, 'postcss-loader', 'sass-loader'],
//           publicPath: '../'
//         })
//       },
//       {
//         test: /\.less$/,
//         include: [config.src],
//         exclude: [config.vendors],
//         use: ExtractTextWebpackPlugin.extract({
//           fallback: {
//             loader: 'style-loader',
//               options: {
//                 singleton: true
//               }
//           },
//           use: [{
//               loader: 'css-loader',
//               options: {
//                 minimize: true
//               }
//           }, 'postcss-loader', 'less-loader'],
//           publicPath: '../'
//         })
    ]
  },
  plugins: [
//     cssExtracter,
//     sassExtracter,
//     lessExtracter,
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),
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