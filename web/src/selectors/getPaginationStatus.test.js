import test from 'ava'
import getPaginationStatus from '../selectors/getPaginationStatus'

test('it should set isBegin as true if fromTo is at the range of the beginning', t => {
  const state = {
    ranges: {
      fromTo: [1, 3],
      total: 12
    }
  }
  const status = getPaginationStatus(state)

  t.true(status.isBegin)
})

test('it should set isBegin as false if fromTo is in the middle/end', t => {
  const stateWithFromToInTheMiddle = {
    ranges: {
      fromTo: [4, 6],
      total: 12
    }
  }
  const stateWithFromToInTheEnd = {
    ranges: {
      fromTo: [10, 12],
      total: 12
    }
  }
  const statusWithFromToInTheMiddle = getPaginationStatus(stateWithFromToInTheMiddle)
  const statusWithFromToInTheEnd = getPaginationStatus(stateWithFromToInTheEnd)

  t.false(statusWithFromToInTheMiddle.isBegin)
  t.false(statusWithFromToInTheEnd.isBegin)
})

test('it should set isEnd as true if fromTo is in the end', t => {
  const state = {
    ranges: {
      fromTo: [10, 12],
      total: 12
    }
  }
  const status = getPaginationStatus(state)

  t.true(status.isEnd)
})

test('it should set isEnd as false if fromTo is in the middle/begining', t => {
  const stateWithFromToInTheMiddle = {
    ranges: {
      fromTo: [4, 6],
      total: 12
    }
  }
  const stateWithFromToInTheBegining = {
    ranges: {
      fromTo: [1, 3],
      total: 12
    }
  }
  const statusWithFromToInTheMiddle = getPaginationStatus(stateWithFromToInTheMiddle)
  const statusWithFromToInTheBegining = getPaginationStatus(stateWithFromToInTheBegining)

  t.false(statusWithFromToInTheMiddle.isEnd)
  t.false(statusWithFromToInTheBegining.isEnd)
})
