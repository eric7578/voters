import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as Post from './Post'
import { More } from './Button'
import SubmitForm from './SubmitForm'

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
    const { posts, onRequestMore } = this.props
    // ignore List/Item/More if no posts is provided
    const containPosts = posts && posts.length > 0

    return (
      <Wrapper>
        {containPosts &&
          <Post.List>
            {posts.map(post =>
              <Post.Item key={post.id} data={post} />
            )}
          </Post.List>
        }
        {containPosts && <More onClick={onRequestMore}>more</More>}
      </Wrapper>
    )
  }

  componentDidMount () {
    this.props.onRequestMore()
  }
}
