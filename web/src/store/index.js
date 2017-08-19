import { createStore, applyMiddleware, combineReducers } from 'redux'
import window from 'global/window'
import sagaMiddleware, { rootSaga } from '../saga'
import ranges from './ranges'

let middleware = applyMiddleware(sagaMiddleware)

if (process.env.NODE_ENV === 'development') {
  // add redux devtool
  const reduxDevToolExt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if (reduxDevToolExt) {
    middleware = reduxDevToolExt(middleware)
  }
}

const reducers = combineReducers({
  ranges
})

const store = createStore(reducers, middleware)

sagaMiddleware.run(rootSaga)

export default store
