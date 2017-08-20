import test from 'ava'
import { call } from 'redux-saga/effects'
import { spy } from 'sinon'
import upvote, { callUpvoteApi } from './upvote'
import * as voteActions from '../actions/vote'

test.serial('#upvote should call callUpvoteApi', t => {
  const id = 'post id'
  const resolve = spy()
  const reject = spy()
  const action = voteActions.upvote(id, resolve, reject)
  const g = upvote(action)

  t.deepEqual(g.next().value, call(callUpvoteApi, id))
  t.true(g.next().done)
  t.true(resolve.called)
  t.false(reject.called)
})

test.serial('#upvote should call payload.reject once got error', t => {
  const id = 'post id'
  const resolve = spy()
  const reject = spy()
  const action = voteActions.upvote(id, resolve, reject)
  const g = upvote(action)

  t.deepEqual(g.next().value, call(callUpvoteApi, id))
  g.throw('some network error')
  t.true(g.next().done)
  t.false(resolve.called)
  t.true(reject.called)
})
