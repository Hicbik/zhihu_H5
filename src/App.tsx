import React, { FC, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { useTypedSelector } from './store/reducer'
import { NoticeIo } from './utils/io'
import { UserRequest } from './utils/request'
import Route from './components/Route'
import Footer from './components/Footer'
import Loading from './components/Loading'
import Tips from './components/Tips'


const App: FC = () => {

    const isLogin = useTypedSelector(state => state.User.isLogin)

    useEffect(() => {
        ;(async () => {
            await UserRequest.Token()
        })()
    }, [])

    useEffect(() => {
        if (isLogin) NoticeIo.init()
        if (NoticeIo.socket && !isLogin) NoticeIo.close()
    }, [isLogin])

    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route
                        path={['/', '/home/:tab']}
                        component={lazy(() => import('./page/Home'))}
                        title='知乎 - 有问题,上知乎'
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
                        component={lazy(() => import('./page/DownApp'))}
                        title='下载App - 知乎'
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
                        path='/Notice'
                        component={lazy(() => import('./page/Notice'))}
                        title='消息中心 - 知乎'
                        exact
                    />
                    <Route
                        path='/Chat'
                        component={lazy(() => import('./page/Chat'))}
                        title='私信 - 知乎'
                        exact
                    />
                    <Route
                        path='/ChatDeal/:_id'
                        component={lazy(() => import('./page/ChatDeal'))}
                        title='私信 - 知乎'
                        exact
                    />
                    <Route
                        path='*'
                        component={lazy(() => import('./page/ErrPage'))}
                        title='一个什么都没有的世界!'
                        exact
                    />
                </Switch>
            </Suspense>
            <Footer />
            <Tips />

        </BrowserRouter>
    )
}

export default App
