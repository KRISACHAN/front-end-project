const path = require('path');
const fs = require('fs');
const project = process.cwd(); // 项目目录
const resolve = dir => path.join(__dirname, '..', dir); // 获取文件夹
const env_array = fs.readFileSync(project + '/.env', 'utf8').split('\r\n'); // 获取环境变量
env_array.forEach(e => {
    let [key, value] = e.split('=');
    if (value === 'false' || value === 'true') {
        process.env[key] = JSON.parse(value);
    } else {
        process.env[key] = value;
    }
}); // 设置环境变量

const config = {
    'project': project, // 项目目录
    'config': path.resolve(__dirname, '../'), // 配置文件目录
    'dev': { // 开发环境配置
        'alias': { // 路径重定向
            '@': resolve('src'),
            'test': resolve('test'),
            'core': resolve('core'),
            'libs': resolve('libs'),
            'static': resolve('static')
        },
        'include': [ // 处理的文件夹
            resolve('src'),
            resolve('test'),
            resolve('core'),
            resolve('static')
        ],
        'exclude': [ // 不处理的文件夹
            resolve('node_modules')
        ]
    },
    'src': resolve('src'), // 源文件目录
    'build': resolve('dist'), // 打包目录
    'html': resolve('views'), // html文件目录
    'node_modules': resolve('node_modules'), // node_modules目录
    'static': resolve('static'), // 静态资源文件夹
    'ignorePages': [''] // 标识没有入口js文件的html
};

module.exports = config;
