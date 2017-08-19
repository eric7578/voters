import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import { Item } from './Post.jsx'
import { Upvote, Downvote } from './Button.jsx'

test('it should call onUpvote when click upvote', t => {
  const data = { id: 1, title: 'a post' }
  const onUpvote = spy()
  const item = shallow(<Item data={data} onUpvote={onUpvote} />)

  item.find(Upvote).simulate('click')

  t.true(onUpvote.calledOnce)
  t.true(onUpvote.calledWithExactly(data))
})

test('it should call onDownvote when click downvote', t => {
  const data = { id: 1, title: 'a post' }
  const onDownvote = spy()
  const item = shallow(<Item data={data} onDownvote={onDownvote} />)

  item.find(Downvote).simulate('click')

  t.true(onDownvote.calledOnce)
  t.true(onDownvote.calledWithExactly(data))
})
