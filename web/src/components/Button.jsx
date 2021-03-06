import styled from 'styled-components'

const Button = styled.button`
  background: #fff;
  border-radius: 5px;
  border: 2px solid;
  cursor: pointer;
  margin-left: 5px;
  outline: none;
  text-transform: uppercase;
`

export const Upvote = styled(Button)`
  border-color: #2bad52;
  color: #2bad52;
`

export const Downvote = styled(Button)`
  border-color: #f44941;
  color: #f44941;
`

export const More = styled(Button)`
  border-color: #333;
  color: #333;
`

export const Previous = styled(Button)`
  border-color: #666;
  color: #666;
`

export const Submit = styled(Button)`
  border-color: #b7b7b7;
  color: #b7b7b7;
`
