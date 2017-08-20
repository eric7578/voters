import { eventChannel } from 'redux-saga'
import { select, actionChannel, take, call, fork, END, put } from 'redux-saga/effects'
import { WebSocket, window } from 'global'
import * as postFeedActions from '../actions/postFeed'
import getPaginationRange from '../selectors/getPaginationRange'

/*
  This saga will first create a websocket channel, and wait until it connected
  Then, it will fork a saga to watch new incoming update messages
  Then, it will listen to NEXT/PREV actions, select pagination range, and then send the updated range back to the server.
*/
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

// This function create a websocket channel and returned after it connected to the server
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

// This function create websocket url by current protocol
export function getWebSocketServerUrl (location) {
  const { protocol, host } = location
  const wsProtocol = protocol === 'https:'
    ? 'wss:'
    : 'ws:'

  return `${wsProtocol}//${host}`
}
