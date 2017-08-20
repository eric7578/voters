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
  let index
  const { numUpvote } = post

  if (posts.length === 0) {
    index = 0
  } else if (posts[start].numUpvote <= numUpvote) {
    // if the first post has the smaller/same numUpvote, place the new post it in front all posts
    index = start
  } else if (posts[end].numUpvote > numUpvote) {
    // if the last post has larger numUpvote, place the new post it in the end
    index = posts.length
  } else {
    index = posts.findIndex(post => post.numUpvote === numUpvote)
  }

  const newPosts = posts.slice()
  newPosts.splice(index, 0, post)
  return {
    index,
    posts: newPosts
  }
}

module.exports = {
  createPost,
  findInsertPosition
}
