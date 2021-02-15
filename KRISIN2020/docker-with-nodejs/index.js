const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            />
            <meta name="screen-orientation" content="portrait" />
            <meta name="x5-orientation" content="portrait" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta http-equiv="Cache-Control" content="no-siteapp" />
            <title>首页</title>
            <style></style>
        </head>
        <body>
            <h2>SERVER_PORT: ${process.env.SERVER_PORT}</h2>
            <h2>EXPOSE_PORT: ${process.env.EXPOSE_PORT}</h2>
            <h2>CONTAINER_NAME: ${process.env.CONTAINER_NAME}</h2>
            <h2>IMAGE_NAME: ${process.env.IMAGE_NAME}</h2>
        </body>
    </html>    
  `)
})

const PORT = Number(process.env.SERVER_PORT) || 8033

app.listen(PORT, () => {})