// 生产环境配置
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackBase = require('./webpack.config.base.js');
const {
    project
} = require('./config.js');

const webpackProd = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: 'static/js/[name].[chunkhash:8].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(le|sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    'less-loader',
                ],
            },
            {
                test: /(\.jsx|\.js)$/,
                use: [
                    'babel-loader'
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[hash].css',
            chunkFilename: 'static/css/[id].[hash].css'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new cleanWebpackPlugin(['./dist/'], {
            root: project
        }),
        new uglifyJSPlugin({
            sourceMap: true,
            include: /\/core/,
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /([\\/]node_modules[\\/]|[\\/]vendors[\\/])/,
                    name: 'vendors',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    }
};

module.exports = webpackMerge(webpackBase, webpackProd);
