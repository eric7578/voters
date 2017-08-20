import reduxSaga from 'redux-saga'
import { takeLatest, fork } from 'redux-saga/effects'
import * as postActions from '../actions/post'
import * as voteActions from '../actions/vote'
import createPost from './createPost'
import followPosts from './followPosts'
import upvote from './upvote'
import downvote from './downvote'

export function * rootSaga () {
  yield takeLatest(postActions.CREATE, createPost)
  yield takeLatest(voteActions.UPVOTE, upvote)
  yield takeLatest(voteActions.DOWNVOTE, downvote)

  // init saga for handling websocket
  yield fork(followPosts)
}

// export saga middleware for redux
const sagaMiddleware = reduxSaga()

export default sagaMiddleware
