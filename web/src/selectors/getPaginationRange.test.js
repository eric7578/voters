import test from 'ava'
import getPaginationRange from '../selectors/getPaginationRange'

test('it should turn current from/to into object', t => {
  const state = {
    ranges: {
      fromTo: [1, 3]
    }
  }
  const range = getPaginationRange(state)

  t.deepEqual(range, { from: 1, to: 3 })
})
