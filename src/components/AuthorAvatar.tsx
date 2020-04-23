import React, { FC } from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

interface Props {
    nickname: string,
    avatar: string,
    one_sentence_introduction?: string,
    onTap?:any
}

const AuthorAvatar: FC<Props> = ({avatar, nickname, one_sentence_introduction, onTap}) => {
    return (
        <Wrapper>
            <Button fullWidth color="primary" onClick={onTap}>
                <img src={avatar} alt="" />
                <div className='author'>
                    <span>{nickname}</span>
                    <span className='miaos'>{one_sentence_introduction}</span>
                </div>
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
display:flex;
align-items: center;
margin-top: 10px;

.MuiButton-label {
  justify-content: flex-start;
  
}
  .MuiButton-root {
    padding: 10px 0;
  }
  

img {
  border-radius: 2px;
  width: 38px;
  height: 38px;
}
.author {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.author span {
  font-weight: bold;
  color: #444;
  margin-left: 14px;
  display:block;  
  font-size: 15px;
  &.miaos {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #646464;
    font-weight:normal;
    font-size: 14px;
  }
}
`


export default AuthorAvatar
