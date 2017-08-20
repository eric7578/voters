import * as postFeedActions from '../actions/postFeed'

const initState = {
  // in the beginning, get the first 20th posts
  fromTo: [1, 3],
  // number of total will update when retceiving the posts
  total: null
}

export default function reducer (state = initState, action) {
  switch (action.type) {
    case postFeedActions.NEXT:
      return next(state, action)
    case postFeedActions.PREV:
      return prev(state, action)
    default:
      return state
  }
}

// update range to the next pagination base on the difference between from/to
// the `from` will not bigger than the number of total
function next (state, action) {
  const [from, to] = state.fromTo
  const pagination = getPagination(from, to)
  if (from + pagination > state.total) {
    return state
  } else {
    return {
      ...state,
      fromTo: [from + pagination, to + pagination]
    }
  }
}

// update range to the prev pagination base on the difference between from/to
// the `from` will not less than 1
function prev (state, action) {
  const [from, to] = state.fromTo
  const pagination = getPagination(from, to)
  const nextFrom = Math.max(from - pagination, 1)
  const nextTo = nextFrom + pagination - 1
  return {
    ...state,
    fromTo: [nextFrom, nextTo]
  }
}

function getPagination (from, to) {
  return to - from + 1
}
