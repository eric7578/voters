export const CREATE = 'post/CREATE'

export function create (title) {
  return {
    type: CREATE,
    payload: {
      title
    }
  }
}
