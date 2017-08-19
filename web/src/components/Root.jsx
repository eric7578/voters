import React from 'react'
import { Provider } from 'react-redux'
import Page from './Page'
import store from '../store'

export default props =>
  <Provider store={store}>
    <Page />
  </Provider>
