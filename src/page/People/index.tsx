import React, { FC, useEffect, useState, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Toast } from 'antd-mobile'
import { Wrapper, UserWrapper, AvatarWrapper } from './style'
import { useTypedSelector } from '../../store/reducer'
import { UserRequest } from '../../utils/request'
import IconDianzan11Copy from '../../components/iconfont/IconDianzan11Copy'
import PeopleTab from '../../components/PeopleTab'
import IconNan from '../../components/iconfont/IconNan'
import IconNv from '../../components/iconfont/IconNv'
import Header from '../../components/Header'
import PrimaryButton from '../../components/PrimaryButton'
import ErrPage from '../ErrPage'

const People: FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useTypedSelector(state => state.User)
    const chatList = useTypedSelector(state => state.Notice.chatList)
    const {_id} = useParams()
    const [data, setData] = useState<any>({})
    const isMy = user._id === data._id


    useEffect(() => {
        ;(async () => {
            window.scrollTo(0, 0)
            const res = await UserRequest.people({_id: _id!})
            if (res.state === 'err') {
                setData({err: true})
                return
            }
            setData({
                ...res.data,
                isLike: user.isLogin && res.data.fans.includes(user._id)
            })
            document.title = res.data.nickname + ' - 知乎'
        })()
        // eslint-disable-next-line
    }, [_id])


    const _onLike = (type: string) => async () => {
        const res: any = await UserRequest.attention({history, type, _id: _id!})
        if (!res) return
        setData({...data, isLike: res.data.includes(user._id)})
    }

    const _onGoToChat = (_id: string, avatar: string, nickname: string) => () => {
        if (!user.isLogin) return Toast.offline('你还没有登录呢宝贝!', 1.5)
        const index = chatList.findIndex(value => value.user_id === _id)
        if (index === -1) {
            dispatch({
                type: 'notice/addChatPeople',
                value: [...chatList, {user_id: _id, avatar, nickname, messageList: []}],
            })
        }
        history.push('/ChatDeal/' + _id)
    }

    return (
        <Wrapper style={{backgroundColor: data.err ? '#fff' : '#f6f6f6'}}>
            <Header />
            {
                data._id && (
                    <Fragment>
                        <UserWrapper>
                            <AvatarWrapper>
                                <img src={data.avatar} alt="" />
                                <h3>{data.nickname}
                                    {data.gender === 1 ? <IconNan style={{marginLeft: 8}} /> :
                                        <IconNv style={{marginLeft: 8}} />}
                                </h3>
                                <span style={{margin: '10px 0'}}>{data.one_sentence_introduction}</span>
                                {
                                    isMy && (
                                        <PrimaryButton
                                            onClick={() => history.push('/editPeople')}
                                            disableElevation={false}
                                        >
                                            编辑个人资料
                                        </PrimaryButton>
                                    )
                                }
                                {
                                    !isMy && (
                                        data.isLike ? (
                                            <PrimaryButton
                                                colorType={'gray'}
                                                onClick={_onLike('noLike')}
                                                disableElevation={false}
                                            >取消关注</PrimaryButton>
                                        ) : (
                                            <PrimaryButton
                                                onClick={_onLike('like')}
                                                disableElevation={false}
                                            >关注ta!</PrimaryButton>
                                        )
                                    )
                                }
                                {
                                    !isMy && (
                                        <PrimaryButton
                                            disableElevation={false}
                                            onClick={_onGoToChat(data._id, data.avatar, data.nickname)}
                                            style={{marginTop: 10}}
                                        >发私信</PrimaryButton>
                                    )
                                }
                            </AvatarWrapper>
                            {
                                data.introduction && (
                                    <div className='dianzan introduction'>
                                        <h3>个人简介</h3>
                                        <p>{data.introduction}</p>
                                    </div>
                                )
                            }
                            <div className='dianzan'>
                                <IconDianzan11Copy /><span>{data.like_count} 赞同</span>
                            </div>
                            <div className='like'>
                                <a href="/">{data.fans_count} 关注{isMy ? '我' : 'ta'}的人</a>
                                <span />
                                <a href="/">{data.attention_count} {isMy ? '我' : 'ta'}关注的人</a>
                            </div>
                        </UserWrapper>
                        <PeopleTab user={data} />
                    </Fragment>
                )
            }
            {
                data.err && (
                    <ErrPage text='这个人可能没了吧!?' />
                )
            }
        </Wrapper>
    )
}

export default People
