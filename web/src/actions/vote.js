export const UPVOTE = 'vote/UPVOTE'

export const DOWNVOTE = 'vote/DOWNVOTE'

export function upvote (id, resolve, reject) {
  return {
    type: UPVOTE,
    payload: {
      id,
      resolve,
      reject
    }
  }
}

export function downvote (id, resolve, reject) {
  return {
    type: DOWNVOTE,
    payload: {
      id,
      resolve,
      reject
    }
  }
}
