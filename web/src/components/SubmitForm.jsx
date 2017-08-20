import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Submit } from './Button'

const FormContent = styled.div`
  align-items: flex-start;
  display: flex;
  padding: 20px 10px;
`

const Input = styled.textarea`
  border: 1px solid #b7b7b7;
  flex: 1;
  outline: none;
  padding: 12px;
  width: 300px;
`

const SubmitButton = styled(Submit)`
  margin-left: 5px;
`

const updateContent = value => prevState => ({
  content: value
})

export default class SubmitForm extends PureComponent {
  static propTypes = {
    maxContentLength: PropTypes.number.isRequired,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    maxContentLength: 255
  }

  state = {
    content: ''
  }

  render () {
    const { maxContentLength } = this.props
    return (
      <form onSubmit={this.onSubmit}>
        <FormContent>
          <Input
            placeholder={`Length of the title should be less than ${maxContentLength}`}
            value={this.state.content}
            onChange={this.onChange}
          />
          <SubmitButton>submit</SubmitButton>
        </FormContent>
      </form>
    )
  }

  onChange = e => {
    this.setState(updateContent(e.target.value))
  }

  onSubmit = e => {
    e.preventDefault()

    // check if content length is over max or empty
    const { maxContentLength, onSubmit } = this.props
    const { content } = this.state
    const isWithinRange = (
      content.length > 0 &&
      content.length <= maxContentLength
    )
    if (isWithinRange && onSubmit) {
      onSubmit(content)
    }
  }
}
