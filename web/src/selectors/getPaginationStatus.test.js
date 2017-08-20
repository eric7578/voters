import test from 'ava'
import getPaginationStatus from '../selectors/getPaginationStatus'

test('it should set hasMore as true, hasPrevious as false if fromTo is at the range of the beginning', t => {
  const state = {
    ranges: {
      fromTo: [1, 3],
      total: 12
    },
    posts: [1, 2, 3]
  }
  const status = getPaginationStatus(state)

  t.false(status.hasPrevious)
  t.true(status.hasMore)
})

test('it should set hasMore/hasPrevious as true if fromTo is in the middle', t => {
  const state = {
    ranges: {
      fromTo: [4, 6],
      total: 12
    },
    posts: [1, 2, 3]
  }
  const status = getPaginationStatus(state)

  t.true(status.hasPrevious)
  t.true(status.hasMore)
})

test('it should set hasMore as false is at the end', t => {
  const state = {
    ranges: {
      fromTo: [10, 12],
      total: 12
    },
    posts: [1, 2, 3]
  }
  const status = getPaginationStatus(state)

  t.true(status.hasPrevious)
  t.false(status.hasMore)
})

test('it should set hasMore/hasPrevious as false if there is no posts', t => {
  const state = {
    ranges: {
      fromTo: [1, 20],
      total: 30
    },
    posts: []
  }
  const status = getPaginationStatus(state)

  t.false(status.hasPrevious)
  t.false(status.hasMore)
})

test('it should set hasMore as false if current page is not filled', t => {
  const state = {
    ranges: {
      fromTo: [1, 3],
      total: 1
    },
    posts: [1]
  }
  const status = getPaginationStatus(state)

  t.false(status.hasPrevious)
  t.false(status.hasMore)
})
