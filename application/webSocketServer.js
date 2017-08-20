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
  posts = reorderPosts(post, posts)
  return post
}

function reorderPosts (insertPost, prevPosts) {
  // get updated index and posts
  const { index, posts } = postManagement.findInsertPosition(insertPost, prevPosts)

  // send the broadcast later
  process.nextTick(() => broadcastEffectRanges(index, clients, posts))
  return posts
}

function upvote (postId) {
  // find and update the target post
  const index = posts.findIndex(post => post.id === postId)
  const [targetPost] = posts.splice(index, 1)
  targetPost.numUpvote += 1

  posts = reorderPosts(targetPost, posts)
}

function downvote (postId) {
  // find and update the target post
  const index = posts.findIndex(post => post.id === postId)
  posts[index].numDownvote += 1

  // send the broadcast later
  // no need to reorder here since the order is base on numUpvote
  process.nextTick(() => broadcastEffectRanges(index, clients, posts))
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
  upvote,
  downvote,
  setup
}
