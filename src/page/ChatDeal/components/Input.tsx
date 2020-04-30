import React, { FC, useState, useRef, useEffect } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import styled from 'styled-components'
import { NoticeIo } from '../../../utils/io'

interface Props {
    people_id: string,
    user: any
}


const Input: FC<Props> = ({people_id, user}) => {

    const [value, setValue] = useState('')
    const input = useRef<any>()
    const winHeight = window.innerHeight


    useEffect(() => {
        window.addEventListener('resize', _Resize)
        return () => window.removeEventListener('resize', _Resize)
        // eslint-disable-next-line
    }, [])

    const _Resize = () => {
        const Height = window.innerHeight
        if (Height === winHeight) {
            input.current.style.marginBottom = 0
        }
    }
    //如果遮挡输入框
    const _ScrollIntoViewIfNeeded = () => {
        setTimeout(() => {
            let rect = input.current.getBoundingClientRect()
            let isCheck = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <=
                (window.innerWidth || document.documentElement.clientWidth)
            )
            if (!isCheck) input.current.style.marginBottom = 75 + 'px'
        }, 100)
    }

    const _onSend = () => {
        NoticeIo.SendChat({send_user: user, receive_user_id: people_id, message: value})
        setValue('')
    }

    return (
        <Wrapper ref={input}>
            <TextareaAutosize
                value={value}
                onChange={event => setValue(event.target.value)}
                rowsMax={6}
                onClick={_ScrollIntoViewIfNeeded}
            />
            <div className='send-button'>
                <span style={{opacity: !value.length ? 0.5 : 1}} onClick={_onSend}>发送</span>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled('label')`
margin-top: auto;
width: 100%;
display:flex;
padding: 15px ;


.send-button {
  display:flex;
  flex-direction: column;
  
  span {
    margin-top: auto;
    background-color: #0084ff;
    color: #fff;
    -webkit-border-radius: 6px;-moz-border-radius: 6px;border-radius: 6px;
    height: 42px;
    padding: 0 15px;
    line-height: 42px;
  }
}

textarea {
  flex: 1;
  background-color: #fff;
  border-radius: 20px;
  padding: 10px;
  margin-right: 10px;
  border:none;
  font-size: 16px;
  resize: none;
  line-height: 1.4;
}
`

export default Input
