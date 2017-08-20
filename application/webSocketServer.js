const WebSocket = require('ws')
const postFeed = require('./services/postFeed')
const storage = require('./services/storage')

// all the websocket clients
const clients = new Map()

function setup (server) {
  const wss = new WebSocket.Server({ server })
  wss.on('connection', ws => {
    // create a new client when connect
    createClient(ws, clients)

    // update client's watching range
    ws.on('message', range => {
      range = JSON.parse(range)

      // range from browser is post's serial number
      range.from -= 1
      range.to -= 1

      // prevent invalid range settings
      if (range.to < range.from) {
        let tmp = range.from
        range.from = range.to
        range.to = tmp
      }

      const client = clients.get(ws)
      updateClientMonitorRange(client, range, storage.get())
    })

    // remove client
    ws.on('close', () => closeClient(ws, clients))
  })
}

function createClient (ws, clients) {
  clients.set(ws, {
    from: null,
    to: null,
    send (data) {
      ws.send(JSON.stringify(data))
    }
  })
}

function closeClient (ws, clients) {
  ws.removeAllListeners()
  clients.delete(ws)
}

function createPost (title) {
  // do create
  const insertOp = postFeed.insert(title, storage.get())

  // update current storage
  storage.set(insertOp.storage)

  // send the broadcast to all sockets
  broadcastEffectRanges(insertOp.index, clients, insertOp.storage)
  return insertOp.post
}

function upvote (postId) {
  // do upvote
  const upvoteOp = postFeed.upvote(postId, storage.get())

  // update current storage
  storage.set(upvoteOp.storage)

  // send the broadcast to all sockets
  broadcastEffectRanges(upvoteOp.index, clients, upvoteOp.storage)
  return upvoteOp.post
}

function downvote (postId) {
  // do downvote
  const downvoteOp = postFeed.downvote(postId, storage.get())

  // update current storage
  storage.set(downvoteOp.storage)

  // send the broadcast to all sockets
  broadcastEffectRanges(downvoteOp.index, clients, downvoteOp.storage)
  return downvoteOp.post
}

function updateClientMonitorRange (client, range, posts) {
  client.from = range.from
  client.to = range.to
  sendPosts(client, posts)
}

function broadcastEffectRanges (updateLocation, clients, posts) {
  for (let ws of clients.keys()) {
    const client = clients.get(ws)
    // update posts when updateLocation is over/within the user's watching range
    const isWithin = updateLocation >= client.from && updateLocation <= client.to
    const isOver = updateLocation < client.to
    if (isWithin || isOver) {
      sendPosts(client, posts)
    }
  }
}

function sendPosts (client, posts) {
  client.send({
    total: posts.length,
    posts: posts.slice(client.from, client.to + 1)
  })
}

module.exports = {
  broadcastEffectRanges,
  updateClientMonitorRange,
  sendPosts,
  createPost,
  upvote,
  downvote,
  setup
}
