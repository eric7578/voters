const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const WebSocket = require('ws')

const isDev = process.env.NODE_ENV === 'development'
const app = express()

if (isDev) {
  // apply hot/dev middlewares
  require('./web/middlewares/webpackMiddleware')(app)
}

app.use(express.static('static'))
app.use(bodyParser.json())

app.use('/api', require('./application/api'))

const port = process.env.PORT || 8080
const server = http.createServer(app)

// websocket server
const wss = new WebSocket.Server({ server })
require('./application/configWebsocket')(wss)

server.listen(port)
