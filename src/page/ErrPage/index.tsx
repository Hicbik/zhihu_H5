import React, {FC} from 'react'
import PrimaryButton from '../../components/PrimaryButton'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'

const ErrPage: FC = () => {
    const history = useHistory()
    return (
        <Wrapper>
            <img src="https://zhstatic.zhihu.com/assets/error/liukanshan_wire.svg" alt="" />
            <p className='color-8590a6'>你好像来到了一个什么都没有的世界!</p>
            <PrimaryButton
                fullWidth
                disableElevation={false}
                onClick={()=>setTimeout(()=>history.push('/'),500)}
            >
                回到首页
            </PrimaryButton>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
width: 70%;
margin:40px auto;
display:flex;
justify-content: center;
flex-direction: column;
align-items: center;
p {
  font-size: 22px;
  font-weight: bold;
  margin: 20px;
  text-align:center;
}
img {
margin-top: 20px;
  width: 150px;
  height: auto;
}
`

export default ErrPage
