import React from 'react'
import { Provider } from 'react-redux'
import store from '../store'

export default props =>
  <Provider store={store}>
    <h1>Let's Vote!!</h1>
  </Provider>
