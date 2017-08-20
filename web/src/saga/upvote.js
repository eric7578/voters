import { call } from 'redux-saga/effects'
import axios from 'axios'

export default function * upvote (action) {
  const { resolve, reject, id } = action.payload
  try {
    yield call(callUpvoteApi, id)
    resolve()
  } catch (err) {
    reject(err)
  }
}

export function callUpvoteApi (id) {
  return axios.put(`/api/posts/${id}/upvote`)
}
