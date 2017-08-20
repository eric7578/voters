import test from 'ava'
import React from 'react'
import { mount, shallow } from 'enzyme'
import { spy } from 'sinon'
import { Page } from './Page.jsx'
import { More, Previous } from './Button.jsx'
import { List, Item } from './Post.jsx'

test('it should not render posts is props.posts is empty', t => {
  const page = shallow(<Page />)

  t.false(page.find(List).exists())
  t.false(page.find(Item).exists())
})

test('it should render posts if provided', t => {
  const posts = [
    { id: 1, title: 'a post' },
    { id: 2, title: 'another post' },
    { id: 3, title: 'yet another post' }
  ]
  const page = shallow(<Page posts={posts} />)

  const postItems = page.find(Item)

  t.is(postItems.length, posts.length)
})

test('it should request for posts of first page when mounted', t => {
  const onRequestMore = spy()
  mount(<Page onRequestMore={onRequestMore} />)

  t.true(onRequestMore.calledOnce)
})

test('it should not render More if isEnd is false', t => {
  const hasMore = false
  const page = shallow(<Page hasMore={hasMore} />)

  t.false(page.find(More).exists())
})

test('it should render More if hasMore is true and request for more posts when click on More', t => {
  const hasMore = true
  const onRequestMore = spy()
  const page = shallow(<Page hasMore={hasMore} onRequestMore={onRequestMore} />)

  page.find(More).simulate('click')

  t.true(onRequestMore.calledOnce)
})

test('it should not render Previous if hasPrevious is false', t => {
  const hasPrevious = false
  const page = shallow(<Page hasPrevious={hasPrevious} />)

  t.false(page.find(Previous).exists())
})

test('it should render Previous if hasPrevious is true and request for previous posts when click on Previous', t => {
  const hasPrevious = true
  const onRequestPrevious = spy()
  const page = shallow(<Page hasPrevious={hasPrevious} onRequestPrevious={onRequestPrevious} />)

  page.find(Previous).simulate('click')

  t.true(onRequestPrevious.calledOnce)
})
