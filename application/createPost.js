const uuid = require('uuid')

module.exports = function createPost (title) {
  return {
    id: uuid.v4(),
    title,
    numUpvote: 0,
    numDownvote: 0
  }
}
