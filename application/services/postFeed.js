const uuid = require('uuid')

// insert a post into storage
// and return a new ordered storage with inserted new post
// the index is the place where the new post is
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

// increase the numUpvote of the target post
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

// decrease the numUpvote of the target post
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

/*
  All the sorting mechanism is in this function.
  First, it will check if the numUpvote of the post is bigger than the first post in the storage.
  If yes, then the post will be prepend in the storage as the first post.
  Sencond, it will check if the numUpvote is smaller than the last post in the storage.
  If yes, it will be placed as the last post in the storage
  In addition, it will try to place the post to the place just before the post that has the same/smaller numUpvote.
*/
function findInsertPosition (post, storage) {
  let start = 0
  let end = storage.length - 1
  const { numUpvote } = post

  if (storage.length === 0) {
    // if there is not posts exist, just place it at the beginning
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
