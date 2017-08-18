const http = require('http')
const express = require('express')

const isDev = process.env.NODE_ENV === 'development'
const app = express()

if (isDev) {
  // apply hot/dev middlewares
  require('./web/middlewares/webpackMiddleware')(app)
}

app.use(express.static('static'))

const port = process.env.PORT || 8080
const server = http.createServer(app)
server.listen(port)
