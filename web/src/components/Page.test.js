import test from 'ava'
import React from 'react'
import { mount, shallow } from 'enzyme'
import { spy } from 'sinon'
import { Page } from './Page.jsx'
import { More } from './Button.jsx'
import { List, Item } from './Post.jsx'

test('it should request for posts of first page when mounted', t => {
  const onRequestMore = spy()
  mount(<Page onRequestMore={onRequestMore} />)

  t.true(onRequestMore.calledOnce)
})

test('it should request for more posts when click more button', t => {
  const onRequestMore = spy()
  const posts = [
    { id: 1, title: 'a post' },
    { id: 2, title: 'another post' },
    { id: 3, title: 'yet another post' }
  ]
  const page = shallow(<Page onRequestMore={onRequestMore} posts={posts} />)

  page.find(More).simulate('click')

  t.true(onRequestMore.calledOnce)
})

test('it should not render posts is props.posts is empty', t => {
  const page = shallow(<Page />)

  t.false(page.find(List).exists())
  t.false(page.find(Item).exists())
  t.false(page.find(More).exists())
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
