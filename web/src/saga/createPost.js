import { call } from 'redux-saga/effects'

export default function * createPost (action) {
  const { resolve, reject, title } = action.payload
  try {
    yield call(callPostApi, title)
    resolve()
  } catch (err) {
    reject(err)
  }
}

export function callPostApi (title) {
  return Promise.resolve()
}
