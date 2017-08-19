export const UPVOTE = 'vote/UPVOTE'

export const DOWNVOTE = 'vote/DOWNVOTE'

export function upvote ({ id }) {
  return {
    type: UPVOTE,
    payload: {
      id
    }
  }
}

export function downvote ({ id }) {
  return {
    type: DOWNVOTE,
    payload: {
      id
    }
  }
}
