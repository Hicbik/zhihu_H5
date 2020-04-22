import React, {FC, useState} from 'react'
import {Button} from 'antd-mobile'
import styled from 'styled-components'
import IconArrowDown from './iconfont/IconArrowDown'

interface Props {
    title: string,
    content: string,
    content_html: string,
    _onWriteAnswer: () => void,
    isReply: any | null,
    _onFocusProblem: (type: string) => any,
    isFocus: boolean,
    _reply_id: string
}

const QuestionHeader: FC<Props> = ({title, content, content_html, _onWriteAnswer, isReply, _onFocusProblem, isFocus, _reply_id}) => {
    const [show, setShow] = useState(() => content.length < 50)

    return (
        <Wrapper>
            <Title>{title}</Title>
            <Content>
                <Problem className={show ? 'show' : ''} dangerouslySetInnerHTML={{__html: content_html}} />
                {
                    !show && (
                        <button className='btn color-175199' onClick={() => setShow(true)}>
                            查看问题描述<IconArrowDown color='#175199' style={{marginLeft: 5}} size={18} />
                        </button>
                    )
                }
            </Content>

            {
                isFocus ? (
                    <Button
                        type='primary'
                        inline
                        className='antd-button'
                        activeStyle={{backgroundColor: '#76839b'}}
                        style={{backgroundColor: '#8590a6'}}
                        onClick={() => _onFocusProblem('down')}
                    >取消关注</Button>
                ) : (
                    <Button
                        type='primary'
                        inline
                        className='antd-button'
                        onClick={() => _onFocusProblem('up')}
                    >关注问题</Button>
                )
            }

            {
                !isReply && (
                    <Button type='ghost' inline className='antd-button' onClick={_onWriteAnswer}>
                        写回答
                    </Button>
                )
            }
            {
                isReply && isReply.reply !== _reply_id && (
                    <Button type='ghost' inline className='antd-button' onClick={_onWriteAnswer}>
                        查看回答
                    </Button>
                )
            }


        </Wrapper>
    )
}

const Wrapper = styled('div')`
background-color: #fff;
box-shadow: 0 1px 3px rgba(26,26,26,.1);
padding: 16px;
color: #1a1a1a;
margin-bottom: 10px;
.antd-button {
  padding: 0 16px;
  line-height: 32px;
  height: 32px;
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: 20px;
  border-radius: 3px;
  cursor: pointer;
}
`
const Title = styled('h1')`
font-size: 20px;
line-height: 1.67;
text-align:left;
`
const Content = styled('section')`
margin-top: 9px;
word-break: break-word;
position: relative;
button.btn {
  width: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background-color:transparent;
  position: absolute;
  bottom: 6px;
  left: 0;
  cursor:pointer;
}
`
const Problem = styled('div')`
max-height: 100px;
mask-image: linear-gradient(#1a1a1a calc(100% - 8rem),transparent calc(100% - 2.8rem));
mask-size: 100% 100%;
line-height: 1.67;
overflow:hidden;
&.show {
  mask-image: none;
  max-height: initial;
`


export default QuestionHeader
