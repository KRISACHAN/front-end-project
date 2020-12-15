const fs = require('fs');

console.log("准备打开文件！");
fs.writeFile('input.txt', '我是通过写入的文件内容！',  (err)=> {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt', (err, data)=> {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});
