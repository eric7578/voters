import reduxSaga from 'redux-saga'
import { takeLatest } from 'redux-saga/effects'
import * as postActions from '../actions/post'
import createPost from './createPost'

export function * rootSaga () {
  yield takeLatest(postActions.CREATE, createPost)
}

// export saga middleware for redux
const sagaMiddleware = reduxSaga()

export default sagaMiddleware
