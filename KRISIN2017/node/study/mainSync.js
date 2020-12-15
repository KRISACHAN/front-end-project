const fs = require('fs'),
      data = fs.readFileSync('input.txt');
/* 阻塞代码实例 */
console.log(data.toString());
console.log("程序执行结束!");
