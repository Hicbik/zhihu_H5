import React, { FC ,useEffect , useRef} from 'react'
import styled from 'styled-components'

interface Props {
    data: {
        user_id:string,
        nickname:string,
        avatar:string
        messageList:any[]
    },
    user: any
}

const ChatList: FC<Props> = ({data, user}) => {
    const dom = useRef<any>()

    useEffect(()=>{
        dom.current.scrollTop += 50
    },[data.messageList.length])

    const HeMessage = ({message}: { message: string }) => {
        return (
            <HeMessageWrapper>
                <img src={data.avatar} alt="" />
                <section>{message}</section>
            </HeMessageWrapper>
        )
    }

    const MyMessage = ({message}: { message: string }) => {
        return (
            <MyMessageWrapper>
                <img src={user.avatar} alt="" />
                <section>{message}</section>
            </MyMessageWrapper>
        )
    }

    return (
        <Wrapper ref={dom}>
            {
                data.messageList.map((value, index) => (
                    value.type === 'he' ?
                        <HeMessage key={index} message={value.message} />
                        :
                        <MyMessage key={index} message={value.message} />
                ))
            }
        </Wrapper>
    )
}

const Wrapper = styled('div')`
flex: 1;
padding: 10px 10px 200px;
overflow-y: auto;
`

const HeMessageWrapper = styled('section')`
display:flex;
margin-bottom: 20px;
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

export default ChatList
