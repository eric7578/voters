export default function getPaginationStatus (state) {
  const { fromTo, total } = state.ranges
  const hasPosts = state.posts.length > 0

  return {
    hasPrevious: hasPosts && fromTo[0] !== 1,
    hasMore: hasPosts && fromTo[1] < total
  }
}
