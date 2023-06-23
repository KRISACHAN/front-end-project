# 模块化知识

## 模块化分类

### iife

IIFE代表立即调用的函数表达式。它是一种将变量声明隔离到本地作用域的方式。

```javascript
(function() {
    var privateVariable = "我是私有的";
    // 其他私有代码在这里...
})();
```

### commonjs(cjs)

CommonJS是Node.js中使用的模块系统，其中模块是同步加载的。

```javascript
// greet.js
module.exports = function() {
    console.log('你好，世界');
}

// app.js
var greet = require('./greet');
greet();
```

### amd

AMD（异步模块定义）用于以非阻塞异步方式定义模块及其依赖项。

```javascript
define(['dependency1', 'dependency2'], function(dependency1, dependency2) {
    return function() {};
});
```

### umd

UMD（通用模块定义）是编写模块的一种模式，使它们在CommonJS、AMD和全局变量中都能工作。

```javascript
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['dependency1', 'dependency2'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('dependency1'), require('dependency2'));
    } else {
        root.returnExports = factory(root.dependency1, root.dependency2);
    }
}(this, function (dependency1, dependency2) {
    return {};
}));
```

### systemJs

SystemJS是一个动态的ES模块加载器，可以在浏览器和NodeJS中运行时导入模块。

```javascript
System.import('some-module').then(function(someModule) {
    console.log(someModule.default);
});
```

### es、esm、module

ES Modules是处理模块的ECMAScript标准。它在现代浏览器和Node.js中使用。

```javascript
// lib.js
export function greet() {
    console.log('你好，世界');
}

// app.js
import { greet } from './lib';
greet();
```

## api 说明

### require()、exports 与 module.exports

在CommonJS中，`require()`用于导入模块，`exports`是将作为模块公开的对象，`module.exports`是实际返回的值，当一个模块被需要时。

```javascript
// lib.js
exports.greet = function() {
console.log('你好，世界');
}

// app.js
var lib = require('./lib');
lib.greet();
```

### import 与 export

在ES模块中，`import`和`export`关键字分别用于导入和导出模块。

```javascript
// lib.js
export function greet() {
console.log('你好，世界');
}

// app.js
import { greet } from './lib';
greet();
```
