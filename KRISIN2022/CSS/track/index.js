const express = require('express')
const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})
app.get('/wind', function (req, res) {
    console.log(req)
    res.send({})
});

app.listen(8033, () => {})