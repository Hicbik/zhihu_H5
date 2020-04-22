import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import rootReducer from './reducer'

const store = () => createStore(rootReducer, applyMiddleware(createLogger()))

export default store()
