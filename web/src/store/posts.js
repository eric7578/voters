import * as postFeedActions from '../actions/postFeed'

export default function reducer (state = [], action) {
  // just simple replace the whole posts from server to the state
  if (action.type === postFeedActions.UPDATE) {
    return action.payload
  } else {
    return state
  }
}
