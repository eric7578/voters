import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FormContent = styled.div`
  align-items: flex-start;
  display: flex;
`

const Input = styled.textarea`
  width: 300px;
`

const SubmitButton = styled.input.attrs({
  type: 'submit'
})`
  margin-left: 5px;
`

const updateContent = value => prevState => ({
  content: value
})

export default class SubmitForm extends PureComponent {
  static propTypes = {
    maxContentLength: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired
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
          <SubmitButton value='Send' />
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
    const { maxContentLength } = this.props
    const { content } = this.state
    const isWithinRange = (
      content.length > 0 &&
      content.length <= maxContentLength
    )
    if (isWithinRange) {
      this.props.onSubmit()
    }
  }
}
