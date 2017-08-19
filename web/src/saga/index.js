import reduxSaga from 'redux-saga'
import { takeLatest, fork } from 'redux-saga/effects'
import * as postActions from '../actions/post'
import createPost from './createPost'
import followPosts from './followPosts'

export function * rootSaga () {
  yield takeLatest(postActions.CREATE, createPost)

  // when take these actions, it will tell the backend to follow different posts
  yield fork(followPosts)
}

// export saga middleware for redux
const sagaMiddleware = reduxSaga()

export default sagaMiddleware
