module.exports = function configWebsocket (wss) {
  wss.on('connection', ws => {
    ws.on('message', message => {

    })
  })
}
