let buf1 = new Buffer(10),
    buf2 = new Buffer([10, 20, 30, 40, 50]),
    buf3 = new Buffer("www.baidu.com", "utf-8");
len = buf1.write("www.baidu.com");

console.log("写入字节数 : "+  len);

let buf4 = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf4[i] = i + 97;
}

console.log( buf4.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf4.toString('ascii',0,5));   // 输出: abcde
console.log( buf4.toString('utf8',0,5));    // 输出: abcde
console.log( buf4.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde

let buf5 = new Buffer('www.runoob.com'),
    json = buf5.toJSON(buf5);

console.log(json);

let buffer1 = new Buffer('ABC'),
    buffer2 = new Buffer('ABCD'),
    result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}

let buffer3 = new Buffer('ABC');
// 拷贝一个缓冲区
let buffer4 = new Buffer(3);
buffer3.copy(buffer4);
console.log("buffer4 content: " + buffer4.toString());

console.log("buffer4 length: " + buffer4.length);
