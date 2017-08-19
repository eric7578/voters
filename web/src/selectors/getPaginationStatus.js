export default function getPaginationStatus (state) {
  const { fromTo, total } = state.ranges
  return {
    isBegin: fromTo[0] === 1,
    isEnd: fromTo[1] === total
  }
}
