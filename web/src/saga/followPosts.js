import { eventChannel } from 'redux-saga'
import { select, actionChannel, take, call, fork, END, put } from 'redux-saga/effects'
import { WebSocket, window } from 'global'
import * as postFeedActions from '../actions/postFeed'
import getPaginationRange from '../selectors/getPaginationRange'

export default function * followPosts () {
  // wait until socket open
  const { channel, send } = yield call(openWebSocketChannel)

  // open another saga for getting incoming messages
  yield fork(watchingIncomingMessage, channel)

  // start to listen next/prev actions
  const actions = yield actionChannel([postFeedActions.NEXT, postFeedActions.PREV])

  while (true) {
    // send current range first
    const range = yield select(getPaginationRange)
    yield call(send, range)
    // once got another action, change range of posts
    yield take(actions)
  }
}

// This saga handles new incoming message for update posts
export function * watchingIncomingMessage (wsChannel) {
  while (true) {
    const posts = yield take(wsChannel)
    yield put(postFeedActions.update(posts))
  }
}

// Since this function has webscoket constructor inside, this part is hard to test
export function * openWebSocketChannel () {
  const ws = new WebSocket(getWebSocketServerUrl(window.location))

  // take this message when socket is open
  const OPEN = 'ws/Open'

  const channel = eventChannel(emitter => {
    ws.addEventListener('message', onMessage)
    ws.addEventListener('close', onClose)
    ws.addEventListener('error', onError)
    ws.addEventListener('open', onOpen)

    function onOpen (e) {
      ws.removeEventListener('open', onOpen)
      emitter(OPEN)
    }

    // receive ws response
    function onMessage (e) {
      const message = JSON.parse(e.data)
      emitter(message)
    }

    // close socket
    function onClose (e) {
      emitter(END)
    }

    function onError (e) {
      console.error(e)
      emitter(END)
    }

    // return callback for close websocket
    return () => {
      ws.removeEventListener('message', onMessage)
      ws.removeEventListener('close', onClose)
      ws.removeEventListener('error', onError)
      ws.close()
    }
  })

  const message = yield take(channel)
  if (message !== OPEN) {
    channel.close()
    throw new Error(`opening socket open failed.`)
  }

  return {
    channel,
    send (range) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(range))
      }
    }
  }
}

export function getWebSocketServerUrl (location) {
  const { protocol, host } = location
  const wsProtocol = protocol === 'https:'
    ? 'wss:'
    : 'ws:'

  return `${wsProtocol}//${host}`
}
