export const CREATE = 'post/CREATE'

export function create (title, resolve, reject) {
  return {
    type: CREATE,
    payload: {
      title,
      resolve,
      reject
    }
  }
}
