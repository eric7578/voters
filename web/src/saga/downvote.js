import { call } from 'redux-saga/effects'
import axios from 'axios'

export default function * downvote (action) {
  const { resolve, reject, id } = action.payload
  try {
    yield call(callDownvoteApi, id)
    resolve()
  } catch (err) {
    reject(err)
  }
}

export function callDownvoteApi (id) {
  return axios.put(`/api/posts/${id}/downvote`)
}
