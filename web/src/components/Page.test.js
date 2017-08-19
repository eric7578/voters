import test from 'ava'
import React from 'react'
import { mount, shallow } from 'enzyme'
import { spy } from 'sinon'
import { Page } from './Page.jsx'
import { More } from './Button.jsx'

test('it should request for posts of first page when mounted', t => {
  const onRequestMore = spy()
  mount(<Page onRequestMore={onRequestMore} />)

  t.true(onRequestMore.calledOnce)
})

test('it should request for more posts when click more button', t => {
  const onRequestMore = spy()
  const page = shallow(<Page onRequestMore={onRequestMore} />)

  page.find(More).simulate('click')

  t.true(onRequestMore.calledOnce)
})
