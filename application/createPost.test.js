const test = require('ava')
const createPost = require('./createPost')

test('#createPost should init numUpvote/numDownvote as 0, and generate id', t => {
  const title = 'a post'
  const post = createPost(title)

  t.truthy(post.id)
  t.is(post.title, title)
  t.is(post.numUpvote, 0)
  t.is(post.numDownvote, 0)
})
