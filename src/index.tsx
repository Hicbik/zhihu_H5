import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import * as serviceWorker from './serviceWorker'
import store from './store'
import './index.css'
import 'nprogress/nprogress.css'


const ReactApp: FC = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}


ReactDOM.render(<ReactApp />, document.getElementById('root'))

serviceWorker.unregister()
