import React, {FC, useState, useEffect, Fragment, useImperativeHandle} from 'react'
import IconDianzan11Copy from './iconfont/IconDianzan11Copy'
import IconHuifu from './iconfont/IconHuifu'
import styled from 'styled-components'
import {CommentRequest} from '../utils/request'
import {DiffTime} from '../utils/time'
import {CircularProgress} from '@material-ui/core'

interface Props {
    onComment: ({name, Father_id, reply_user_id,}: { name: string, Father_id: string, reply_user_id: string }) => any,
    reply_id: string,
    reply_user_id: string,
    question_user_id: string,
    user_id: string,
    history: any,
    cRef: any,
    comment_count: number
}

const ReplyComment: FC<Props> = ({onComment, comment_count, reply_id, history, reply_user_id, user_id, question_user_id, cRef}) => {


    const [data, setData] = useState<any[]>([])

    useImperativeHandle(cRef, () => ({
        setData: getAjax
    }))

    useEffect(() => {
        getAjax()
        // eslint-disable-next-line
    }, [])

    const getAjax = async () => {
        const res = await CommentRequest.findComment({reply_id})
        setData(
            res.data.map((value: any) => ({
                ...value,
                Child: value.Child.map((item: any) => ({
                    ...item.comment,
                    user_id: {...item.user},
                    reply_user_nickname: item.reply_user_id.nickname
                }))
            }))
        )
    }

    const _onLike = async ({comment_id, type}: { comment_id: string, type: string }) => {
        const res = await CommentRequest.Like({history, comment_id, type})
        if (!res) return
        setData(
            data.map(
                value => ({
                    ...value,
                    like_count: value._id === comment_id ? res.data.like_count : value.like_count,
                    like_id: value._id === comment_id ? res.data.like_id : value.like_id,
                    Child: value.Child.map((item: any) => ({
                        ...item,
                        like_count: item._id === comment_id ? res.data.like_count : item.like_count,
                        like_id: item._id === comment_id ? res.data.like_id : item.like_id,
                    }))
                })
            )
        )
    }

    const ReplyCommentItem = ({value, onReplyclick, onLike}: { value: any, onReplyclick: any, onLike: any }) => {
        return (
            <CommentItem>
                <div className='top'>
                    <img src={value.user_id.avatar} alt="" />
                    <span>{value.user_id.nickname}</span>
                    {
                        reply_user_id === value.user_id._id && (
                            <span className='color-8590a6' style={{marginLeft: 5}}> (作者) </span>
                        )
                    }
                    {
                        question_user_id === value.user_id._id && (
                            <span className='color-8590a6' style={{marginLeft: 5}}> (提问者) </span>
                        )
                    }
                    <span className='color-8590a6'>{DiffTime(value.create_time)}</span>
                </div>
                <div className='comment-content'>
                    <p>
                        {
                            value.reply_user_nickname && (
                                <span className='color-8590a6'>回复 {value.reply_user_nickname} : </span>
                            )
                        }
                        {value.content}
                    </p>
                    <div className='footer'>
                        <div
                            className='footer-span'
                            onClick={() => onLike({
                                type: value.like_id.includes(user_id) ? 'down' : 'up',
                                comment_id: value._id
                            })}
                        >
                            <IconDianzan11Copy
                                size={14}
                                color={value.like_id.includes(user_id) ? '#0084ff' : '#8590a6'}
                            />
                            {!!value.like_count && value.like_count}
                        </div>
                        <div
                            className='footer-span'
                            onClick={onReplyclick}
                        >
                            <IconHuifu  size={20} /> 回复
                        </div>
                    </div>
                </div>
            </CommentItem>
        )
    }

    return (
        <Fragment>
            {
                data.map(value => (
                    <div style={{padding: 10}} key={value._id}>
                        <ReplyCommentItem
                            value={value}
                            onReplyclick={() => onComment({
                                name: value.user_id.nickname,
                                Father_id: value._id,
                                reply_user_id: value.user_id._id,
                            })}
                            onLike={_onLike}
                        />
                        {
                            value.Child.map((item: any) => (
                                <div style={{paddingLeft: 35}} key={item._id}>
                                    <ReplyCommentItem
                                        value={item}
                                        onReplyclick={() => onComment({
                                            name: item.user_id.nickname,
                                            Father_id: value._id,
                                            reply_user_id: item.user_id._id
                                        })}
                                        onLike={_onLike}
                                    />
                                </div>
                            ))
                        }
                    </div>
                ))
            }
            {
                comment_count > 0 && !data.length && (
                    <div style={{width: '100%', height: 50, display: 'flex', justifyContent: 'center', marginTop: 20}}>
                        <CircularProgress size={30} />
                    </div>
                )
            }
        </Fragment>
    )
}


const CommentItem = styled('section')`
padding-top: 10px;
width: 100%;
div.top {
  display:flex;
  align-items: center;
  font-size: 14px;
  
  img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-right: 5px;
  }
  
  span {
    font-size: 15px;
  }
  
  span:first-of-type {
    font-size: 15px;
  }
  
  span:last-of-type {
    margin-left: auto;
    font-size: 14px;
  }
}
div.comment-content {
  margin-left: 35px;
  margin-top: 5px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f6f6f6;
}
div.footer {
  margin-top: 5px;
  display:flex;
  align-items: center;
  .footer-span {
    display:flex;
    align-items: center;
    color: #8590a6;
    margin-right: 20px;
    font-size: 14px;
    svg {
      margin-right: 5px;
    }
  }
}
`


export default ReplyComment
