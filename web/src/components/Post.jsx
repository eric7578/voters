import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Upvote, Downvote } from './Button'

export const List = styled.ol`
  margin: 0;
  padding: 0;
`

const ListWrapper = styled.li`
  align-items: flex-end;
  border-bottom: 1px solid #999;
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  padding: 10px;
`

const Title = styled.h2`
  color: #333;
  flex: 1;
  font-size: 16px;
  margin: 0;
`

export class Item extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      numUpvote: PropTypes.number,
      numDownvote: PropTypes.number
    }).isRequired,
    onUpvote: PropTypes.func,
    onDownvote: PropTypes.func
  }

  render () {
    const { data, onUpvote, onDownvote } = this.props
    // button labels
    const upvoteLabel = data.numUpvote > 0
      ? `up (${data.numUpvote})`
      : `up`
    const downvoteLabel = data.numDownvote > 0
      ? `downvote (${data.numDownvote})`
      : `downvote`

    return (
      <ListWrapper>
        <Title>{data.title}</Title>
        <Upvote onClick={this.onUpvote}>{upvoteLabel}</Upvote>
        <Downvote onClick={this.onDownvote}>{downvoteLabel}</Downvote>
      </ListWrapper>
    )
  }

  // add data as parmeter to callback
  bindCallback = callbackName => e => {
    const callback = this.props[callbackName]
    if (typeof callback === 'function') {
      callback(this.props.data)
    }
  }

  onUpvote = this.bindCallback('onUpvote')

  onDownvote = this.bindCallback('onDownvote')
}
