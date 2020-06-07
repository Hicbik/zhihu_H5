import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useTypedSelector } from '../store/reducer'

const Footer: FC = () => {
    const {pathname} = useLocation()
    const online_users = useTypedSelector(state => state.Notice.online_users)
    const isLogin = useTypedSelector(state => state.User.isLogin)

    if (/^\/ChatDeal\//.test(pathname) || /^\/downApp/.test(pathname)) {
        return null
    }

    return (
        <Wrapper>
            <p>由Ts+React+Egg.js+MongoDB+Redis驱动</p>
            <p>迷茫是什么?迷茫就是大事干不了,小事不想干,能力配不上欲望,才华配不上梦想。</p>
            <p>© 2020 知乎 v1.0</p>
            {isLogin && !!online_users && <p>-- 当前在线用户 : {online_users === 1 ? '1 (没错就是你~)' : online_users} --</p>}
        </Wrapper>
    )
}

const Wrapper = styled('footer')`
text-align:center;
margin: 60px 0;
p {
  font-size: 13px;
  width: 80%;
  color: #8590a6;
  line-height: 1.2;
  margin:5px auto;
}
`

export default Footer
