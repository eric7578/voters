// next page of posts feed
export const NEXT = 'postFeed/NEXT'

// prev page of posts feed
export const PREV = 'postFeed/PREV'

// update posts feed
export const UPDATE = 'postFeed/UPDATE'

export function next () {
  return {
    type: NEXT
  }
}

export function prev () {
  return {
    type: PREV
  }
}

export function update (posts) {
  return {
    type: UPDATE,
    payload: posts
  }
}
