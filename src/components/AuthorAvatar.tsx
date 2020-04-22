import React, {FC} from 'react'
import styled from 'styled-components'


interface Props {
    nickname: string,
    avatar: string,
    one_sentence_introduction?: string
}

const AuthorAvatar: FC<Props> = ({avatar,nickname,one_sentence_introduction}) => {
    return (
        <Wrapper>
            <img src={avatar} alt="" />
            <div className='author'>
                <span>{nickname}</span>
                <span className='miaos'>{one_sentence_introduction}</span>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
padding: 16px 0;
display:flex;
align-items: center;
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
span {
  font-weight: bold;
  color: #1a1a1a;
  margin-left: 14px;
  display:block;  
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
