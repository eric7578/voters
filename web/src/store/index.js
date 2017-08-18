import { createStore, applyMiddleware } from 'redux'
import window from 'global/window'
import sagaMiddleware, { rootSaga } from '../saga'

let middleware = applyMiddleware(sagaMiddleware)

if (process.env.NODE_ENV === 'development') {
  // add redux devtool
  const reduxDevToolExt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if (reduxDevToolExt) {
    middleware = reduxDevToolExt(middleware)
  }
}

const reducers = (state = {}, action) => state

const store = createStore(reducers, middleware)

sagaMiddleware.run(rootSaga)

export default store
