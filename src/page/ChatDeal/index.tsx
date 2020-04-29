import React from 'react'
import { useHistory } from 'react-router-dom'
import { Wrapper, GlobalStyle } from './style'
import HeaderBar from '../../components/HeaderBar'
import Input from './components/Input'


const ChatDeal = () => {
    const history = useHistory()

    return (
        <Wrapper>
            <GlobalStyle />
            <HeaderBar history={history} title='asd' />
            <Input />
        </Wrapper>
    )
}

export default ChatDeal
