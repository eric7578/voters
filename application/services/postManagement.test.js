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

test('#insertPost should insert the post according to the numUpvote decedent', t => {
  const posts = [
    { numUpvote: 50 },
    { numUpvote: 40 },
    { numUpvote: 30 },
    { numUpvote: 20 },
    { numUpvote: 10 }
  ]
  const post = { numUpvote: 30 }

  const index = postManagement.findInsertPosition(post, posts)

  t.is(index, 2)
})

test('#insertPost should insert the post with most numUpvote in front', t => {
  const posts = [
    { numUpvote: 50 },
    { numUpvote: 40 },
    { numUpvote: 30 },
    { numUpvote: 20 },
    { numUpvote: 10 }
  ]
  const post = { numUpvote: 60 }

  const index = postManagement.findInsertPosition(post, posts)

  t.is(index, 0)
})

test('#insertPost should insert the post with least numUpvote in front', t => {
  const posts = [
    { numUpvote: 50 },
    { numUpvote: 40 },
    { numUpvote: 30 },
    { numUpvote: 20 },
    { numUpvote: 10 }
  ]
  const post = { numUpvote: 5 }

  const index = postManagement.findInsertPosition(post, posts)

  t.is(index, posts.length)
})
