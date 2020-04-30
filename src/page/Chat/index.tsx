import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import {useTypedSelector} from '../../store/reducer'
import { Wrapper } from './style'
import HeaderBar from '../../components/HeaderBar'
import PeopleList from './components/PeopleList'

const Chat: FC = () => {

    const history = useHistory()
    const state= useTypedSelector(state => state.Notice.chatList)

    return (
        <Wrapper>
            <HeaderBar history={history} title='私信' />
            <PeopleList history={history} list={state}/>
        </Wrapper>
    )
}

export default Chat
