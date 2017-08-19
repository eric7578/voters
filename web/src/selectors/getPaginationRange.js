export default function getPaginationRange (state) {
  const [from, to] = state.ranges.fromTo
  return {
    from,
    to
  }
}
