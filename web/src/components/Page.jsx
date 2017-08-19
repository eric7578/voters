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

export class Page extends Component {
  static propTypes = {
    isBegin: PropTypes.bool,
    isEnd: PropTypes.bool,
    posts: PropTypes.array,
    onRequestMore: PropTypes.func,
    onRequestPrevious: PropTypes.func
  }

  render () {
    const {
      posts,
      onRequestMore,
      onRequestPrevious,
      onCreateTitle,
      onUpvote,
      onDownvote,
      isBegin,
      isEnd
    } = this.props
    // ignore List/Item/More if no posts is provided
    const containPosts = posts && posts.length > 0

    return (
      <Wrapper>
        <SubmitForm onSubmit={onCreateTitle} />
        {containPosts &&
          <Post.List>
            {posts.map(post =>
              <Post.Item
                key={post.id}
                data={post}
                onUpvote={onUpvote}
                onDownvote={onDownvote}
              />
            )}
          </Post.List>
        }
        {!isBegin && <Previous onClick={onRequestPrevious}>previous</Previous>}
        {!isEnd && <More onClick={onRequestMore}>more</More>}
      </Wrapper>
    )
  }

  componentDidMount () {
    this.props.onRequestMore()
  }
}

function mapStateToProps (state) {
  const { isBegin, isEnd } = getPaginationStatus(state)
  return {
    isBegin,
    isEnd,
    posts: state.posts
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onCreateTitle: postActions.create,
    onUpvote: voteActions.upvote,
    onDownvote: voteActions.downvote,
    onRequestMore: postFeedActions.next,
    onRequestPrevious: postFeedActions.prev
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
