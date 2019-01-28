// 测试环境配置
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const webpackBase = require('./webpack.config.base.js');
const {
    dev: {
        include,
        exclude
    }
} = require('./config.js');

const webpackTest = {
    'mode': 'none',
    'devtool': '#inline-source-map',
    'module': {
        'rules': [
            {
                'test': /\.css$/,
                'include': include,
                'exclude': exclude,
                'use': ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                'test': /\.scss$/,
                'include': include,
                'exclude': exclude,
                'use': ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                'test': /\.less$/,
                'include': include,
                'exclude': exclude,
                'use': ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            }
        ]
    }
};

module.exports = webpackMerge(webpackBase, webpackTest);
