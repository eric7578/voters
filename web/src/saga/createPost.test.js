import test from 'ava'
import { call } from 'redux-saga/effects'
import { spy } from 'sinon'
import createPost, { callPostApi } from './createPost'
import * as postActions from '../actions/post'

test.serial('#createPost should call callPostApi to create new post', t => {
  const title = 'a post'
  const resolve = spy()
  const reject = spy()
  const action = postActions.create(title, resolve, reject)
  const g = createPost(action)

  t.deepEqual(g.next().value, call(callPostApi, title))
  t.true(g.next().done)
  t.true(resolve.called)
  t.false(reject.called)
})

test.serial('#createPost should call payload.reject once got error', t => {
  const title = 'a post'
  const resolve = spy()
  const reject = spy()
  const action = postActions.create(title, resolve, reject)
  const g = createPost(action)

  t.deepEqual(g.next().value, call(callPostApi, title))
  g.throw('some network error')
  t.true(g.next().done)
  t.false(resolve.called)
  t.true(reject.called)
})
