const WebSocket = require('ws')
const postManagement = require('./services/postManagement')

// in memory storage
// all the posts
let posts = []

// object that map id with the current index
// const mapPostIdToIndex = {}

// all the websocket clients
let clients = new Map()

let wss

function setup (server) {
  wss = new WebSocket.Server({ server })
  wss.on('connection', ws => {
    // create a new client when connect
    createClient(ws, clients)

    // update client's watching range
    ws.on('message', range => {
      range = JSON.parse(range)
      updateClientMonitorRange(ws, range)
    })

    // remove client
    ws.on('close', () => closeClient(ws, clients))
  })
}

function createClient (ws, clients) {
  clients.set(ws, {
    isReady: false,
    send (data) {
      const sendPosts = posts.slice(this.from, this.to + 1)
      ws.send(JSON.stringify(sendPosts))
    }
  })
}

function closeClient (ws, clients) {
  clients.delete(ws)
}

function updateClientMonitorRange (ws, range) {
  const client = clients.get(ws)
  if (client) {
    // prevent invalid range settings
    const from = Math.min(range.from, range.to)
    const to = Math.max(range.from, range.to)

    client.isReady = true
    client.from = from - 1
    client.to = to - 1
    clients.set(ws, client)
    client.send()
  }
}

function createPost (title) {
  const post = postManagement.createPost(title)
  const insert = postManagement.findInsertPosition(post, posts)
  posts = insert.posts

  // send the broadcast later
  process.nextTick(() => broadcastEffectRanges(insert.index, clients, posts))
  return post
}

function broadcastEffectRanges (updateLocation, clients, posts) {
  for (let ws of clients.keys()) {
    const client = clients.get(ws)
    // update posts when updateLocation is over/within the user's watching range
    const isWithin = updateLocation >= client.from && updateLocation <= client.to
    const isOver = updateLocation < client.to
    if (isWithin || isOver) {
      client.send()
    }
  }
}

module.exports = {
  broadcastEffectRanges,
  createPost,
  setup
}
