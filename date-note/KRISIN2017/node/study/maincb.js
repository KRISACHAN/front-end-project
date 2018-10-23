const fs = require('fs');

fs.readFile('input.txt',(err, data)=>{
  if(err){
    return console.error(err);
  };
  console.log(data.toString());
});

console.log("程序执行结束!");
/* 非阻塞代码实例 */
