// next page of posts feed
export const NEXT = 'postFeed/NEXT'

// prev page of posts feed
export const PREV = 'postFeed/PREV'

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
