const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app)

app.get('/', (req, res) => res.send('hello world'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
  next()
})

app.get('/jsonp', (req, res) => {
  const cb = req.query.callback
  console.log(req.query)
  const GETDATA = JSON.stringify(req.query.text)
  const RAN = Number.parseInt(Math.random() * 30)
  cb ? res.jsonp({ data: `${GETDATA}${RAN}` }): res.send(RAN)
})

app.get('/cors', cors(), (req, res, next) => {
  const RAN = Number.parseInt(Math.random() * 30)
  res.send({ data: RAN })
})

http.listen(7777, () => console.log(`localhost:7777`))
