const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(`
    SERVER_PORT: ${process.env.SERVER_PORT},
    EXPOSE_PORT: ${process.env.EXPOSE_PORT},
    CONTAINER_NAME: ${process.env.CONTAINER_NAME},
    IMAGE_NAME: ${process.env.IMAGE_NAME}
  `)
})

const PORT = Number(process.env.SERVER_PORT) || 8033

app.listen(PORT, () => {})