import * as postFeedActions from '../actions/postFeed'

export default function reducer (state = [], action) {
  // simply replace the entire posts
  if (action.type === postFeedActions.UPDATE) {
    return action.payload.posts
  } else {
    return state
  }
}
