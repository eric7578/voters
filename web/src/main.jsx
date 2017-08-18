import React from 'react'
import ReactDOM from 'react-dom'
import document from 'global/document'
import Root from './components/Root'

const rootNode = document.getElementById('root')

const render = () => {
  ReactDOM.render(<Root />, rootNode)
}

render()
