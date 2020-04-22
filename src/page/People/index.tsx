import React, {FC, useEffect, useState, Fragment} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Button} from 'antd-mobile'
import {Wrapper, UserWrapper, AvatarWrapper} from './style'
import {useTypedSelector} from '../../store/reducer'
import {UserRequest} from '../../utils/request'
import IconDianzan11Copy from '../../components/iconfont/IconDianzan11Copy'
import PeopleTab from '../../components/PeopleTab'
import IconNan from '../../components/iconfont/IconNan'
import IconNv from '../../components/iconfont/IconNv'
import Header from '../../components/Header'

const People: FC = () => {
    const history = useHistory()
    const state = useTypedSelector(state => state.User)
    const {_id} = useParams()
    const [data, setData] = useState<any>({})
    const isMy = state._id === data._id


    useEffect(() => {
        const getAjaxData = async () => {
            const res = await UserRequest.people({_id: _id!})
            setData({
                ...res.data,
                isLike: state.isLogin && res.data.fans.includes(state._id)
            })
        }
        getAjaxData()
        // eslint-disable-next-line
    }, [_id])


    const _onLike = async (type: string) => {
        const res: any = await UserRequest.attention({history, type, _id: _id!})
        if (!res) return
        setData({...data, isLike: res.data.includes(state._id)})
    }

    return (
        <Wrapper>
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
                                <span>{data.one_sentence_introduction}</span>
                                <span>{data.introduction}</span>
                                {
                                    isMy && (
                                        <Button
                                            type='primary'
                                            inline
                                            className='antd-button'
                                            onClick={() => history.push('/editPeople')}
                                        >编辑个人资料</Button>
                                    )
                                }
                                {
                                    !isMy && (
                                        data.isLike ? (
                                            <Button
                                                type='primary'
                                                inline
                                                className='antd-button'
                                                activeStyle={{backgroundColor: '#76839b'}}
                                                style={{backgroundColor: '#8590a6'}}
                                                onClick={() => _onLike('noLike')}
                                            >取消关注</Button>
                                        ) : (
                                            <Button
                                                type='primary'
                                                inline
                                                className='antd-button'
                                                onClick={() => _onLike('like')}
                                            >关注ta!</Button>
                                        )
                                    )
                                }
                            </AvatarWrapper>
                            <div className='dianzan'>
                                <IconDianzan11Copy /><span>{data.like_count} 赞同</span>
                            </div>
                            <div className='like'>
                                <a href="/">{data.fans_count} 关注{isMy ? '我' : 'ta'}的人</a>
                                <span />
                                <a href="/">{data.attention_count} {isMy ? '我' : 'ta'}关注的人</a>
                            </div>
                        </UserWrapper>
                        <PeopleTab />
                    </Fragment>
                )
            }
        </Wrapper>
    )
}

export default People
