import test from 'ava'
import { call, select, actionChannel, take, fork } from 'redux-saga/effects'
import followPosts, { openWebSocketChannel, watchingIncomingMessage } from './followPosts'
import * as postFeedActions from '../actions/postFeed'
import getPaginationRange from '../selectors/getPaginationRange'

test.serial('#createPost should call callPostApi to create new post', t => {
  const g = followPosts()

  t.deepEqual(g.next().value, call(openWebSocketChannel))

  const websocketChannel = {
    channel: () => {},
    send: () => {}
  }
  t.deepEqual(g.next(websocketChannel).value, fork(watchingIncomingMessage, websocketChannel.channel))

  t.deepEqual(
    g.next().value,
    actionChannel([postFeedActions.NEXT, postFeedActions.PREV])
  )

  const channel = () => {}
  t.deepEqual(g.next(channel).value, take(channel))

  t.deepEqual(g.next().value, select(getPaginationRange))

  const range = {
    from: 1,
    to: 3
  }
  t.deepEqual(g.next(range).value, call(websocketChannel.send, range))
  t.false(g.next().done)
})
