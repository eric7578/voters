import test from 'ava'
import { call, select, actionChannel, take, fork } from 'redux-saga/effects'
import followPosts, { openWebSocketChannel, watchingIncomingMessage, getWebSocketServerUrl } from './followPosts'
import * as postFeedActions from '../actions/postFeed'
import getPaginationRange from '../selectors/getPaginationRange'

test('#createPost should call callPostApi to create new post', t => {
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
  t.deepEqual(g.next(channel).value, select(getPaginationRange))

  const range = {
    from: 1,
    to: 3
  }
  t.deepEqual(g.next(range).value, call(websocketChannel.send, range))

  t.deepEqual(g.next().value, take(channel))

  t.false(g.next().done)
})

test('#getWebSocketServerUrl should format as wss protocol if current protocol is https', t => {
  const wssUrl = getWebSocketServerUrl({
    protocol: 'https:',
    host: 'some-host-name'
  })

  t.is(wssUrl, 'wss://some-host-name')
})

test('#getWebSocketServerUrl should format as ws protocol if current protocol is http', t => {
  const wssUrl = getWebSocketServerUrl({
    protocol: 'http:',
    host: 'some-host-name'
  })

  t.is(wssUrl, 'ws://some-host-name')
})
