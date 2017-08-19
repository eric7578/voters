// next page of posts feed
export const NEXT = 'postFeed/NEXT'

// prev page of posts feed
export const PREV = 'postFeed/PREV'

export function next (pagination) {
  return {
    type: NEXT,
    payload: {
      pagination
    }
  }
}

export function prev (pagination) {
  return {
    type: PREV,
    payload: {
      pagination
    }
  }
}
