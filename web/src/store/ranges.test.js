import test from 'ava'
import ranges from './ranges'
import * as postFeedActions from '../actions/postFeed'

test('it should update ranges of feed when get action of postFeed.NEXT', t => {
  const state = { fromTo: [1, 3] }
  const action = postFeedActions.next()

  const nextState = ranges(state, action)

  t.deepEqual(nextState, { fromTo: [4, 6] })
})

test('it should not change ranges when at the end of the feed', t => {
  const state = { fromTo: [4, 6], total: 6 }
  const action = postFeedActions.next()

  const nextState = ranges(state, action)

  t.deepEqual(nextState, { fromTo: [4, 6], total: 6 })
})

test('it should update ranges of feed when get action of postFeed.PREV', t => {
  const state = { fromTo: [4, 6] }
  const action = postFeedActions.prev()

  const nextState = ranges(state, action)

  t.deepEqual(nextState, { fromTo: [1, 3] })
})

test('it should not change ranges when in the begining of the feed', t => {
  const state = { fromTo: [1, 3] }
  const action = postFeedActions.prev()

  const nextState = ranges(state, action)

  t.deepEqual(nextState, { fromTo: [1, 3] })
})
