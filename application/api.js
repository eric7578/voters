const { Router } = require('express')
const { createPost, upvote, downvote } = require('./webSocketServer')

const api = Router()

api.post('/posts', (req, res) => {
  res.json(createPost(req.body.title))
})

api.put('/posts/:id/upvote', (req, res) => {
  upvote(req.params.id)
  res.end()
})

api.put('/posts/:id/downvote', (req, res) => {
  downvote(req.params.id)
  res.end()
})

api.use((err, req, res, next) => {
  res.status(err.status || 500).end(`
    ${err.message}
    ${err.stack}
  `)
})

module.exports = api
