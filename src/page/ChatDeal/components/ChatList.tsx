import React, { FC, useEffect, useRef, Fragment } from 'react'
import { IconButton } from '@material-ui/core'
import styled from 'styled-components'
import { ChatTime, messageTime } from '../../../utils/time'

interface Props {
    data: {
        user_id: string,
        nickname: string,
        avatar: string
        messageList: any[]
    },
    user: any,
    history: any
}

const ChatList: FC<Props> = ({data, user, history}) => {
    const dom = useRef<any>()

    useEffect(() => {
        dom.current.scrollTop += 50
    }, [data.messageList.length])

    const LinkToPeople = (_id: string) => () => {
        setTimeout(() => history.push(`/people/${_id}`), 500)
    }

    const HeMessage = ({message}: { message: string }) => {
        return (
            <HeMessageWrapper>
                <div className='avatar'>
                    <IconButton component='div' onClick={LinkToPeople(data.user_id)}>
                        <img src={data.avatar} alt="" />
                    </IconButton>
                </div>
                <section>{message}</section>
            </HeMessageWrapper>
        )
    }

    const MyMessage = ({message}: { message: string }) => {
        return (
            <MyMessageWrapper>
                <div className='avatar'>
                    <IconButton component='div'>
                        <img src={user.avatar} alt="" />
                    </IconButton>
                </div>
                <section>{message}</section>
            </MyMessageWrapper>
        )
    }

    return (
        <Wrapper ref={dom}>
            {
                data.messageList.map((value, index) => (
                    <Fragment key={index}>
                        {messageTime(data.messageList[index === 0 ? 0 : index - 1].time, value.time) && (
                            <p className='time'>{ChatTime(value.time)}</p>
                        )}
                        {index === 0 && <p className='time'>{ChatTime(value.time)}</p>}
                        {value.type === 'he' && <HeMessage message={value.message} />}
                        {value.type === 'my' && <MyMessage message={value.message} />}
                    </Fragment>
                ))
            }
        </Wrapper>
    )
}

const Wrapper = styled('div')`
flex: 1;
padding: 10px 10px 200px;
overflow-y: auto;
p.time {
  color: #999;
  text-align:center;
  font-size: 14px;
  margin: 10px 0;
}
`

const HeMessageWrapper = styled('section')`
display:flex;
margin-bottom: 20px;
.MuiIconButton-root {
  padding: 0;
  align-items: initial;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
section {
  background-color: #fff;
  padding: 10px 12px;
  margin: 0 15px;
  border-radius: 8px;
  position: relative;
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 1.4;
  display: inline-flex;
  &::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    left: -4px;
    top: 14px;
    background: #fff;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
`

const MyMessageWrapper = styled(HeMessageWrapper)`
flex-direction: row-reverse;
section {
  background-color: #0084ff;
  color: #fff;
  &::after {
    right: -4px;
    left: initial;
    background: #0084ff;
  }
}
`

export default React.memo(ChatList)
