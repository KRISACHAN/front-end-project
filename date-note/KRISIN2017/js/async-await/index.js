const express = require('express')
const fs = require('fs')
const app = express()
const http = require('http').createServer(app)

app.use(express.static(__dirname + '/static'))

// 基本用法
const asyncReadFile = async () => {
  const f1 = await fs.readFileSync('./texts/a.txt')
  const f2 = await fs.readFileSync('./texts/b.txt')
  console.log(`
    ${f1.toString()},
    ${f2.toString()}
  `)
}

asyncReadFile()

// async函数返回的是 Promise 对象，可以作为await命令的参数。
const timeout = async (ms) => await new Promise(res => setTimeout(res, ms))

// promise的chain形式
timeout(2000).then(res => console.log('ok'))

// await的形式
const asyncPrint = async (value, ms) => {
  await timeout(ms)
  console.log(value)
}

asyncPrint('hello world', 1000)

// 函数声明
async function foo () {}

// 函数表达式
const bar = async () => {}

// 对象的形式
const obj = { async foo (ms) { return await new Promise(res => setTimeout(res, ms)) } }
obj.foo(3000).then(res => console.log('obj'))

// class的形式
class Cls {
  constructor () {}
  async foo (ms) { return await new Promise(res => setTimeout(res, ms)) }
}

const newCls = new Cls()
newCls.foo(5000).then(res => console.log('class'))

http.listen(5000, () => console.log(`localhost:5000`))