const express = require('express')
const app = express()
const http = require('http').createServer(app)

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile('./public/index.html'))

app.get('/sse', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })
  setInterval(function () {
      res.write(`data: ${Date.now()} \n\n`);
  }, 1000)
})


http.listen(8000, () => console.log(`localhost:8000`))
