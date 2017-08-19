const test = require('ava')
const postManagement = require('./postManagement')

test('#createPost should init numUpvote/numDownvote as 0, and generate id', t => {
  const title = 'a post'
  const post = postManagement.createPost(title)

  t.truthy(post.id)
  t.is(post.title, title)
  t.is(post.numUpvote, 0)
  t.is(post.numDownvote, 0)
})
