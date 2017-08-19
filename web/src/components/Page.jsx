import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as Post from './Post'
import { More } from './Button'

const Wrapper = styled.div`
  margin: auto;
  width: 1000px;
`

export class Page extends Component {
  static propTypes = {
    posts: PropTypes.array,
    onRequestMore: PropTypes.func
  }

  render () {
    return (
      <Wrapper>
        <More onClick={this.props.onRequestMore}>more</More>
      </Wrapper>
    )
  }

  componentDidMount () {
    this.props.onRequestMore()
  }
}
