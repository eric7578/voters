const uuid = require('uuid')

function createPost (title) {
  return {
    id: uuid.v4(),
    title,
    numUpvote: 0,
    numDownvote: 0
  }
}

function findInsertPosition (post, posts) {
  let start = 0
  let end = posts.length - 1
  const { numUpvote } = post

  // if the first post has the smaller/same numUpvote, place the new post it in front all posts
  if (posts[start].numUpvote <= numUpvote) {
    return start
  } else if (posts[end].numUpvote > numUpvote) {
    // if the last post has larger numUpvote, place the new post it in the end
    return posts.length
  } else {
    return posts.findIndex(post => post.numUpvote === numUpvote)
  }
}

module.exports = {
  createPost,
  findInsertPosition
}
