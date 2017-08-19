const { Router } = require('express')
const createPost = require('./createPost')

const api = Router()

api.post('/posts', (req, res) => {
  res.json(createPost(req.body.title))
})

api.use((err, req, res, next) => {
  res.status(err.status || 500).end(`
    ${err.message}
    ${err.stack}
  `)
})

module.exports = api
