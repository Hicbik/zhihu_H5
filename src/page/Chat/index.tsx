import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Wrapper } from './style'
import {useTypedSelector} from '../../store/reducer'
import HeaderBar from '../../components/HeaderBar'
import PeopleList from './components/PeopleList'

const Chat: FC = () => {

    const history = useHistory()

    return (
        <Wrapper>
            <HeaderBar history={history} title='私信' />
            <PeopleList history={history}/>
        </Wrapper>
    )
}

export default Chat
