import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import SubmitForm from './SubmitForm.jsx'

const mockSubmitEvent = {
  preventDefault () {}
}

test('it should not call onSubmit when text content is empty', t => {
  const onSubmit = spy()
  const form = shallow(<SubmitForm onSubmit={onSubmit} />)

  form.find('form').simulate('submit', mockSubmitEvent)

  t.false(onSubmit.called)
})

test('it should not call onSubmit when text content is over maxContentLength', t => {
  const maxContentLength = 5
  const content = 'abcdef'
  const onSubmit = spy()
  const form = shallow(<SubmitForm maxContentLength={maxContentLength} onSubmit={onSubmit} />)

  form.setState({ content })
  form.find('form').simulate('submit', mockSubmitEvent)

  t.false(onSubmit.called)
})

test('it should call onSubmit when text content is within maxContentLength', t => {
  const maxContentLength = 5
  const content = 'abcde'
  const onSubmit = spy()
  const form = shallow(<SubmitForm maxContentLength={maxContentLength} onSubmit={onSubmit} />)

  form.setState({ content })
  form.find('form').simulate('submit', mockSubmitEvent)

  t.true(onSubmit.called)
})
