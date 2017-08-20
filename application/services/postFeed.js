const uuid = require('uuid')

// insert a post into storage
function insert (title, storage) {
  const post = {
    id: uuid.v4(),
    title,
    numUpvote: 0,
    numDownvote: 0
  }
  const index = findInsertPosition(post, storage)
  storage.splice(index, 0, post)

  return {
    index,
    post,
    storage
  }
}

function upvote (id, storage) {
  // find target post
  const targetIndex = findPostIndexById(id, storage)

  // remove it from storage, update, and reorder again
  const [targetPost] = storage.splice(targetIndex, 1)
  targetPost.numUpvote += 1

  // insert into storage
  const index = findInsertPosition(targetPost, storage)
  storage.splice(index, 0, targetPost)

  return {
    index,
    post: targetPost,
    storage
  }
}

function downvote (id, storage) {
  // find target post and update
  const targetIndex = findPostIndexById(id, storage)
  const targetPost = storage[targetIndex]
  targetPost.numDownvote += 1

  // no necessary to reorder again
  return {
    index: targetIndex,
    post: targetPost,
    storage
  }
}

function findPostIndexById (id, storage) {
  return storage.findIndex(post => post.id === id)
}

function findInsertPosition (post, storage) {
  let start = 0
  let end = storage.length - 1
  const { numUpvote } = post

  if (storage.length === 0) {
    return 0
  } else if (storage[start].numUpvote <= numUpvote) {
    // if the first post has the smaller/same numUpvote, place the new post it in front all posts
    return start
  } else if (storage[end].numUpvote > numUpvote) {
    // if the last post has larger numUpvote, place the new post it in the end
    return storage.length
  } else {
    return storage.findIndex(post => post.numUpvote <= numUpvote)
  }
}

module.exports = {
  insert,
  upvote,
  downvote,
  findInsertPosition
}
