const test = require('ava')
const { findInsertPosition, insert, upvote, downvote } = require('./postFeed')

test('#insert should insert a new post with numUpvote/numDownvote as 0', t => {
  const title = 'a post'
  const operation = insert(title, [
    { id: 1, numUpvote: 50 },
    { id: 2, numUpvote: 40 },
    { id: 3, numUpvote: 30 }
  ])

  // check post format
  t.truthy(operation.post.id)
  t.is(operation.post.title, title)
  t.is(operation.post.numUpvote, 0)
  t.is(operation.post.numDownvote, 0)

  // should be append to the last
  t.is(operation.index, 3)

  // new storage
  t.deepEqual(operation.storage, [
    { id: 1, numUpvote: 50 },
    { id: 2, numUpvote: 40 },
    { id: 3, numUpvote: 30 },
    operation.post
  ])
})

test(`#upvote should update post's numUpvote`, t => {
  const targetId = 2
  const operation = upvote(targetId, [
    { id: 1, numUpvote: 0 },
    { id: 2, numUpvote: 0 },
    { id: 3, numUpvote: 0 }
  ])

  // should be target post
  t.deepEqual(operation.post, { id: 2, numUpvote: 1 })

  // should be prepend to the first
  t.is(operation.index, 0)

  // new storage
  t.deepEqual(operation.storage, [
    { id: 2, numUpvote: 1 },
    { id: 1, numUpvote: 0 },
    { id: 3, numUpvote: 0 }
  ])
})

test(`#downvote should update post's numDownvote`, t => {
  const targetId = 2
  const operation = downvote(targetId, [
    { id: 1, numUpvote: 3, numDownvote: 0 },
    { id: 2, numUpvote: 2, numDownvote: 0 },
    { id: 3, numUpvote: 1, numDownvote: 0 }
  ])

  // should be target post
  t.deepEqual(operation.post, { id: 2, numUpvote: 2, numDownvote: 1 })

  // should be in the same place
  t.is(operation.index, 1)

  // new storage
  t.deepEqual(operation.storage, [
    { id: 1, numUpvote: 3, numDownvote: 0 },
    { id: 2, numUpvote: 2, numDownvote: 1 },
    { id: 3, numUpvote: 1, numDownvote: 0 }
  ])
})

test('#findInsertPosition should insert the post according to the numUpvote decedent', t => {
  const storage = [
    { id: 1, numUpvote: 50 },
    { id: 2, numUpvote: 40 },
    { id: 3, numUpvote: 30 },
    { id: 4, numUpvote: 20 },
    { id: 5, numUpvote: 10 }
  ]
  const post = { id: 6, numUpvote: 30 }

  const index = findInsertPosition(post, storage)

  t.is(index, 2)
})

test('#findInsertPosition should insert the post with most numUpvote in front', t => {
  const storage = [
    { id: 1, numUpvote: 50 },
    { id: 2, numUpvote: 40 },
    { id: 3, numUpvote: 30 },
    { id: 4, numUpvote: 20 },
    { id: 5, numUpvote: 10 }
  ]
  const post = { id: 6, numUpvote: 60 }

  const index = findInsertPosition(post, storage)

  t.is(index, 0)
})

test('#findInsertPosition should insert the post with least numUpvote in front', t => {
  const storage = [
    { id: 1, numUpvote: 50 },
    { id: 2, numUpvote: 40 },
    { id: 3, numUpvote: 30 },
    { id: 4, numUpvote: 20 },
    { id: 5, numUpvote: 10 }
  ]
  const post = { id: 6, numUpvote: 5 }

  const index = findInsertPosition(post, storage)

  t.is(index, storage.length)
})

test('#findInsertPosition should insert post into storage according to the order of numUpvote', t => {
  const storage = [
    { id: 1, numUpvote: 50 },
    { id: 2, numUpvote: 40 },
    { id: 3, numUpvote: 30 },
    { id: 4, numUpvote: 20 },
    { id: 5, numUpvote: 10 }
  ]
  const post = { id: 6, numUpvote: 35 }

  const index = findInsertPosition(post, storage)

  t.is(index, 2)
})
