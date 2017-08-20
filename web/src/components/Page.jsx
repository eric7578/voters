import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Post from './Post'
import { More, Previous } from './Button'
import SubmitForm from './SubmitForm'
import getPaginationStatus from '../selectors/getPaginationStatus'
import * as postActions from '../actions/post'
import * as voteActions from '../actions/vote'
import * as postFeedActions from '../actions/postFeed'

const Wrapper = styled.div`
  margin: auto;
  width: 1000px;
`

const Footer = styled.div`
  padding: 30px;
  text-align: center;
`

export class Page extends Component {
  static propTypes = {
    hasPrevious: PropTypes.bool,
    hasMore: PropTypes.bool,
    posts: PropTypes.array,
    onRequestMore: PropTypes.func,
    onRequestPrevious: PropTypes.func
  }

  render () {
    const {
      posts,
      onRequestMore,
      onRequestPrevious,
      hasPrevious,
      hasMore
    } = this.props
    // ignore List/Item/More if no posts is provided
    const containPosts = posts && posts.length > 0

    return (
      <Wrapper>
        <SubmitForm onSubmit={this.onSubmit} />
        {containPosts &&
          <Post.List>
            {posts.map((post, index) =>
              <Post.Item
                key={post.id}
                data={post}
                onUpvote={this.onUpvote}
                onDownvote={this.onDownvote}
              />
            )}
          </Post.List>
        }
        <Footer>
          {hasPrevious && <Previous onClick={onRequestPrevious}>previous</Previous>}
          {hasMore && <More onClick={onRequestMore}>more</More>}
        </Footer>
      </Wrapper>
    )
  }

  componentDidMount () {
    this.props.onRequestMore()
  }

  // create a new post
  onSubmit = title => {
    this.props.onCreateTitle(title)
      .catch(err => alert(`Oooops!`))
  }

  onUpvote = data => {
    this.props.onUpvote(data.id)
      .catch(err => alert('Operation failed!'))
  }

  onDownvote = data => {
    this.props.onDownvote(data.id)
      .catch(err => alert('Operation failed!'))
  }
}

function mapStateToProps (state) {
  const { hasPrevious, hasMore } = getPaginationStatus(state)
  return {
    hasPrevious,
    hasMore,
    posts: state.posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({
      onCreateTitle: postActions.create,
      onRequestMore: postFeedActions.next,
      onRequestPrevious: postFeedActions.prev
    }, dispatch),
    onCreateTitle (title) {
      return new Promise((resolve, reject) => {
        dispatch(postActions.create(title, resolve, reject))
      })
    },
    onUpvote (id) {
      return new Promise((resolve, reject) => {
        dispatch(voteActions.upvote(id, resolve, reject))
      })
    },
    onDownvote (id) {
      return new Promise((resolve, reject) => {
        dispatch(voteActions.downvote(id, resolve, reject))
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
