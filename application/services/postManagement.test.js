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

test('#findInsertPosition should insert the post according to the numUpvote decedent', t => {
  const posts = [
    { id: 1, numUpvote: 50 },
    { id: 2, numUpvote: 40 },
    { id: 3, numUpvote: 30 },
    { id: 4, numUpvote: 20 },
    { id: 5, numUpvote: 10 }
  ]
  const post = { id: 6, numUpvote: 30 }

  const insert = postManagement.findInsertPosition(post, posts)

  t.is(insert.index, 2)
  t.deepEqual(insert.posts, [
    { id: 1, numUpvote: 50 },
    { id: 2, numUpvote: 40 },
    { id: 6, numUpvote: 30 },
    { id: 3, numUpvote: 30 },
    { id: 4, numUpvote: 20 },
    { id: 5, numUpvote: 10 }
  ])
})

test('#findInsertPosition should insert the post with most numUpvote in front', t => {
  const posts = [
    { id: 1, numUpvote: 50 },
    { id: 2, numUpvote: 40 },
    { id: 3, numUpvote: 30 },
    { id: 4, numUpvote: 20 },
    { id: 5, numUpvote: 10 }
  ]
  const post = { id: 6, numUpvote: 60 }

  const insert = postManagement.findInsertPosition(post, posts)

  t.is(insert.index, 0)
  t.deepEqual(insert.posts, [
    { id: 6, numUpvote: 60 },
    { id: 1, numUpvote: 50 },
    { id: 2, numUpvote: 40 },
    { id: 3, numUpvote: 30 },
    { id: 4, numUpvote: 20 },
    { id: 5, numUpvote: 10 }
  ])
})

test('#findInsertPosition should insert the post with least numUpvote in front', t => {
  const posts = [
    { id: 1, numUpvote: 50 },
    { id: 2, numUpvote: 40 },
    { id: 3, numUpvote: 30 },
    { id: 4, numUpvote: 20 },
    { id: 5, numUpvote: 10 }
  ]
  const post = { id: 6, numUpvote: 5 }

  const insert = postManagement.findInsertPosition(post, posts)

  t.is(insert.index, posts.length)
  t.deepEqual(insert.posts, [
    { id: 1, numUpvote: 50 },
    { id: 2, numUpvote: 40 },
    { id: 3, numUpvote: 30 },
    { id: 4, numUpvote: 20 },
    { id: 5, numUpvote: 10 },
    { id: 6, numUpvote: 5 }
  ])
})
