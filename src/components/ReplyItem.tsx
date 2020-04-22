import React, {FC, useState, useRef} from 'react'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import {TextField} from '@material-ui/core'
import AuthorAvatar from './AuthorAvatar'
import {DiffTime} from '../utils/time'
import LikeButton from './LikeButton'
import IconArrowUp from './iconfont/IconArrowUp'
import IconArrowDown from './iconfont/IconArrowDown'
import IconPinglun from './iconfont/IconPinglun'
import IconZuozhe from './iconfont/IconZuozhe'
import PrimaryButton from './PrimaryButton'
import {CommentRequest} from '../utils/request'
import ReplyComment from './ReplyComment'
import {Toast} from 'antd-mobile'


interface Props {
    value: any,
    user_id: string,
    question_user_id: string
}

const ReplyItem: FC<Props> = ({value, user_id, question_user_id}) => {

    const history = useHistory()
    const isShow = value.content.length > 66
    const [show, setShow] = useState(() => !isShow)
    const [showComment, setShowComment] = useState(false)
    const [CommentValue, setCommentValue] = useState('')
    const [label, setLabel] = useState({
        text: `评论给 ${value.user_id.nickname} (作者)`,
        Father_id: '',
        type: 'father',
        reply_user_id: ''
    })
    const input: any = useRef(null)
    const ReplyItem = useRef()

    const _onComment = ({name, Father_id, reply_user_id}: { name: string, Father_id: string, reply_user_id: string }) => {
        setLabel({
            text: `回复 ${name}`,
            Father_id,
            type: 'child',
            reply_user_id
        })
        input.current.focus()
    }

    const _onCommentAuthor = () => {
        setLabel({
            text: `评论给 ${value.user_id.nickname} (作者)`,
            Father_id: '',
            type: 'father',
            reply_user_id: ''
        })
        input.current.focus()
    }

    const _onButton = async () => {
        const res = await CommentRequest.create({
            history,
            reply_id: value._id,
            question_id: value.question_id,
            content: CommentValue,
            type: label.type,
            Father_id: label.Father_id,
            reply_user_id: label.reply_user_id
        })
        if (!res) return
        // @ts-ignore
        await ReplyItem.current.setData()
        setCommentValue('')
        Toast.success('评论成功!',1.5)
    }


    return (
        <Item>
            <AuthorAvatar
                nickname={value.user_id.nickname}
                avatar={value.user_id.avatar}
                one_sentence_introduction={value.user_id.one_sentence_introduction}
            />
            <Content dangerouslySetInnerHTML={{__html: value.content_html}} className={show ? 'show' : ''} />
            {
                !show && (
                    <UnfoldButton className='color-175199' onClick={() => setShow(true)}>
                        展开阅读全文<IconArrowDown color='#175199' style={{marginLeft: 5}} size={18} />
                    </UnfoldButton>
                )
            }
            <Time className='color-8590a6'>发布于 {DiffTime(value.create_time)}</Time>
            <BottomBar>
                <LikeButton
                    num={value.like_count}
                    like_id={value.like_id}
                    no_like_id={value.no_like_id}
                    user_id={user_id}
                    replay_id={value._id}
                />
                <BottomSpan onClick={() => setShowComment(!showComment)}>
                    <IconPinglun color='#8590a6' size={18} />
                    {!showComment && (!value.comment_count ? '添加评论' : `评论 ${value.comment_count}`)}
                    {showComment && '收起评论'}
                </BottomSpan>
                {
                    label.text !== `评论给 ${value.user_id.nickname} (作者)` && (
                        <BottomSpan onClick={_onCommentAuthor}>
                            <IconZuozhe />
                            给作者评论
                        </BottomSpan>
                    )
                }
                {
                    isShow && show && (
                        <BottomSpan style={{marginLeft: 'auto'}} onClick={() => setShow(false)}>
                            收起<IconArrowUp color='#8590a6' />
                        </BottomSpan>
                    )
                }
            </BottomBar>

            {
                showComment && (
                    <Comment>
                        <h3>{!value.comment_count ? '还没有评论' : `${value.comment_count} 条评论`}</h3>
                        <ReplyComment
                            onComment={_onComment}
                            reply_id={value._id} reply_user_id={value.user_id._id}
                            question_user_id={question_user_id}
                            user_id={user_id}
                            history={history}
                            cRef={ReplyItem}
                            comment_count={value.comment_count}
                        />
                        <EditComment>
                            <TextField
                                id="outlined-multiline-flexible"
                                label={label.text}
                                multiline
                                value={CommentValue}
                                rowsMax={9}
                                onChange={event => setCommentValue(event.target.value)}
                                variant="outlined"
                                size='small'
                                inputRef={input}
                            />
                            <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
                                <PrimaryButton
                                    disabled={!CommentValue.length}
                                    style={{height: 39}}
                                    onClick={_onButton}
                                >
                                    发布
                                </PrimaryButton>
                            </div>
                        </EditComment>
                    </Comment>
                )
            }
        </Item>
    )
}


const Item = styled('div')`
border-bottom: 1px solid #f6f6f6;
padding: 0 0 5px 0;
&:last-of-type {
  border-bottom:none;
}
`
const Content = styled('section')`
line-height: 1.67;
font-size: 17px;
color: #1a1a1a;
word-break: break-word;
max-height: 300px;
mask-image: linear-gradient(#1a1a1a calc(100% - 8rem),transparent calc(100% - 1rem));
&.show {
  mask-image: none;
  max-height: initial;
}
ul li {
  margin-left: 20px;
}
`
const Time = styled('div')`
font-size: 14px;
margin-top: 10px;
`
const BottomBar = styled('div')`
display: flex;
align-items: center;
`

const BottomSpan = styled('div')`
display:flex;
align-items: center;
color: #8590a6;
font-size: 14px;
font-weight: bold;
margin-left: 8px;
svg {
  margin-right: 3px;
}
`
const UnfoldButton = styled('button')`
 width: 100%;
 display:flex;
 justify-content: center;
 align-items: center;
 outline: none;
 border: none;
 background-color:transparent;
 cursor:pointer;
 margin: 10px 0 20px;
`
const Comment = styled('div')`
border: 1px solid #ebebeb;
box-shadow: 0 1px 3px rgba(26,26,26,.1);
border-radius: 3px;
h3 {
  color: grey;
  padding: 10px 15px;
  font-size: 15px;
  background-color: #f6f6f6;
}
`
const EditComment = styled('div')`
display:flex;
border-top: 1px solid #ebebeb;
padding: 10px;
.MuiTextField-root {
  flex: 1;
  margin-right: 10px;
}
`

export default ReplyItem
