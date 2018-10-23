const fs = require('fs');

console.log("查看 /tmp 目录");
fs.readdir("../tmp/test'/",function(err, files){
   if (err) {
       return console.error(err);
   }
   files.forEach( function (file){
       console.log( file );
   });
});
