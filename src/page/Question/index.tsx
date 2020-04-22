import React, {FC, Fragment, useEffect, useMemo, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useTypedSelector} from '../../store/reducer'
import {Toast} from 'antd-mobile'
import {Wrapper} from './style'
import Header from '../../components/Header'
import QuestionHeader from '../../components/QuestionHeader'
import Reply from '../../components/Reply'
import HotQuestionsList from '../../components/HotQuestionsList'
import {QuestionRequest} from '../../utils/request'
import QuestionAd from '../../components/QuestionAd'
import ReplyEdit from '../../components/ReplyEdit'


interface data {
    _id?: string,
    title?: string,
    content_html?: string,
    content?: string,
    reply_count?: number,
    user_id?: string,
    reply_id?: { user: string, reply: string }[],
    focus_problem?: string[]
}

const Question: FC = () => {
    const history = useHistory()
    const state = useTypedSelector(state => state.User)
    const {_id, _reply_id} = useParams()
    const [data, setData] = useState<data>({})
    const [replyList, setReplyList] = useState([])
    const [showEdit, setShowEdit] = useState(false)


    useEffect(() => {
        ;(async () => {
            const res: any = await QuestionRequest.findOne({_id})
            if (res.state === 'err') return
            setData({...res.data})
            document.title = `${res.data.title} -知乎`
        })()
    }, [_id])

    useEffect(() => {
        ;(async () => {
            const res: any = await QuestionRequest.getReply({question_id: _id, reply_id: _reply_id})
            if (res.state === 'err') return
            // @ts-ignore
            setReplyList([...res.data])
        })()
    }, [_id, _reply_id])


    //如果没有该用户的回答 返回 null
    const isReply = useMemo<any>(() => {
        return data.reply_id ? data.reply_id.find(value => value.user === state._id) : null
    }, [data, state._id])

    const isFocus = useMemo(() => {
        return data.focus_problem && data.focus_problem.includes(state._id!)
    }, [data, state._id])


    const _onWriteAnswer = () => {
        if (isReply) {
            history.push(`/question/${_id}/answer/${isReply.reply}`)
            return
        }
        if (!state.isLogin) {
            Toast.fail('你好像还没有登录哦!', 1.5, () => history.push('/signIn'))
            return
        }
        setShowEdit(true)
    }

    const _onFocusProblem = async (type: string) => {
        const res: any = await QuestionRequest.focus({_id: data._id!, type, history})
        if (!res) return
        setData({
            ...data,
            focus_problem: [...res.data.focus_problem],
        })
    }

    const _onReplySuccess = (reply_id: string, question: any) => {
        history.push(`/question/${_id}/answer/${reply_id}`)
        setShowEdit(false)
        setData({...data, ...question})
    }


    return (
        <Wrapper>
            {
                data._id && (
                    <Fragment>
                        <Header />
                        <QuestionHeader
                            title={data.title!}
                            content={data.content!}
                            content_html={data.content_html!}
                            _onWriteAnswer={_onWriteAnswer}
                            _onFocusProblem={_onFocusProblem}
                            isReply={isReply!}
                            isFocus={isFocus!}
                            _reply_id={_reply_id!}
                        />
                        {
                            showEdit && (
                                <ReplyEdit
                                    question_id={data._id}
                                    nickname={state.nickname!}
                                    avatar={state.avatar!}
                                    one_sentence_introduction={state.one_sentence_introduction}
                                    onReplySuccess={_onReplySuccess}
                                />
                            )
                        }
                        <Reply
                            title={!data.reply_count ? '还没有回答' : `${data.reply_count} 个回答`}
                            data={replyList.filter((value, index) => index === 0)}
                            reply_count={data.reply_count}
                            user_id={state._id!}
                            showTitle={!_reply_id}
                            openApp={!!_reply_id}
                            question_user_id={data.user_id!}
                        />
                        <QuestionAd url='http://cdn.sujie.ink/B56BCAC2EDA3DD59148CBAB2D79372F9.jpg' />
                        {
                            data.reply_count! > 1 && !_reply_id && (
                                <Fragment>
                                    <Reply
                                        title='更多回答'
                                        data={replyList.filter((value, index) => index > 0)}
                                        openApp
                                        reply_count={data.reply_count}
                                        user_id={state._id!}
                                        question_user_id={data.user_id!}
                                    />
                                    <QuestionAd url='https://pic1.zhimg.com/v2-1e346c72e7ae0c088b4c443c2457ced0.jpeg' />
                                </Fragment>
                            )
                        }

                        <HotQuestionsList history={history}/>
                    </Fragment>
                )
            }
        </Wrapper>
    )
}

export default Question
