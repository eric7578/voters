import test from 'ava'
import { call } from 'redux-saga/effects'
import { spy } from 'sinon'
import downvote, { callDownvoteApi } from './downvote'
import * as voteActions from '../actions/vote'

test.serial('#downvote should call callDownvoteApi', t => {
  const id = 'post id'
  const resolve = spy()
  const reject = spy()
  const action = voteActions.downvote(id, resolve, reject)
  const g = downvote(action)

  t.deepEqual(g.next().value, call(callDownvoteApi, id))
  t.true(g.next().done)
  t.true(resolve.called)
  t.false(reject.called)
})

test.serial('#downvote should call payload.reject once got error', t => {
  const id = 'post id'
  const resolve = spy()
  const reject = spy()
  const action = voteActions.downvote(id, resolve, reject)
  const g = downvote(action)

  t.deepEqual(g.next().value, call(callDownvoteApi, id))
  g.throw('some network error')
  t.true(g.next().done)
  t.false(resolve.called)
  t.true(reject.called)
})
