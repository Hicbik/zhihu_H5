import React, {FC, useEffect, lazy, Suspense} from 'react'
import {BrowserRouter, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import {CircularProgress} from '@material-ui/core'
import {UserRequest} from './utils/request'
import Route from './components/Route'
import Footer from './components/Footer'
import store from './store'


const App: FC = () => {

    useEffect(() => {
        (async () => await UserRequest.Token())()
    }, [])

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Suspense fallback={(
                    <div style={{width: '100%', height: 50, display: 'flex', justifyContent: 'center', marginTop: 150}}>
                        <CircularProgress
                            variant="indeterminate"
                            disableShrink
                            thickness={4}
                            style={{
                                color: '#6798e5',
                                animationDuration: '550ms',
                            }}
                        />
                    </div>
                )}>
                    <Switch>
                        <Route
                            path={['/', '/home/:tab']}
                            component={lazy(() => import('./page/Home'))}
                            title='知乎- 有问题,上知乎'
                            exact
                        />
                        <Route
                            path='/signIn'
                            component={lazy(() => import('./page/SignIn'))}
                            title='登录 - 知乎'
                            exact
                        />
                        <Route
                            path='/downApp'
                            render={() => <div>downapp</div>}
                            exact
                        />
                        <Route
                            path={['/question/:_id', '/question/:_id/answer/:_reply_id']}
                            component={lazy(() => import('./page/Question'))}
                            exact
                        />
                        <Route
                            path='/people/:_id'
                            component={lazy(() => import('./page/People'))}
                            exact
                        />
                        <Route
                            path='/editPeople'
                            component={lazy(() => import('./page/EditPeople'))}
                            exact
                        />
                        <Route
                            path='/search'
                            component={lazy(() => import('./page/Search'))}
                            exact
                        />
                        <Route
                            path='/newQuestion'
                            component={lazy(() => import('./page/NewQuestion'))}
                            exact
                        />
                        <Route
                            path='*'
                            component={lazy(() => import('./page/ErrPage'))}
                            title='什么都没有的地方!'
                            exact
                        />
                    </Switch>
                </Suspense>
                <Footer />
            </BrowserRouter>
        </Provider>
    )
}

export default App
