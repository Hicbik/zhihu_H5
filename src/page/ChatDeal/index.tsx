import React, { FC, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Wrapper, GlobalStyle } from './style'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../store/reducer'
import HeaderBar from '../../components/HeaderBar'
import Input from './components/Input'
import ChatList from './components/ChatList'


const ChatDeal: FC = () => {
    const dispatch = useDispatch()
    const state = useTypedSelector(state => state.User)
    const chatList = useTypedSelector(state => state.Notice.chatList)
    const history = useHistory()
    const {_id} = useParams()

    const index = chatList.findIndex(value => value.user_id === _id)


    useEffect(() => {
        dispatch({
            type: 'notice/changeWin',
            value: _id
        })
        dispatch({
            type: 'notice/delNewMsg',
            user_id: _id
        })

        return () => {
            dispatch({
                type: 'notice/changeWin',
                value: null
            })
        }
        // eslint-disable-next-line
    }, [])


    if (index === -1) return null

    return (
        <Wrapper>
            <GlobalStyle />
            <HeaderBar history={history} title={chatList[index].nickname} />
            <ChatList
                data={chatList[index]}
                user={state}
                history={history}
            />
            <Input people_id={_id!} user={state} />
        </Wrapper>
    )
}

export default ChatDeal
