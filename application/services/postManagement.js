const uuid = require('uuid')

function createPost (title) {
  return {
    id: uuid.v4(),
    title,
    numUpvote: 0,
    numDownvote: 0
  }
}

module.exports = {
  createPost
}
