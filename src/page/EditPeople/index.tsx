import React, { FC, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { useTypedSelector } from '../../store/reducer'
import { IconButton, Radio, TextField } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import { Wrapper } from './style'
import { UserRequest, QiniuUpload } from '../../utils/request'
import { Toast } from 'antd-mobile'
import HeaderBar from '../../components/HeaderBar'

const EditPeople: FC = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const state = useTypedSelector(state => state.User)
    const [user, setUser] = useState({
        nickname: '',
        one_sentence_introduction: '',
        gender: '1',
        introduction: '',
        load: false
    })
    const [avatar, setAvatar] = useState<any>('')
    const file: any = useRef()

    useEffect(() => {
        ;(async () => {
            if (!state._id) return history.push('/signIn')
            const res: any = await UserRequest.people({_id: state._id!})
            setUser({
                nickname: res.data.nickname,
                one_sentence_introduction: res.data.one_sentence_introduction,
                gender: res.data.gender.toString(),
                introduction: res.data.introduction,
                load: true
            })
            setAvatar(res.data.avatar)
        })()
        // eslint-disable-next-line
    }, [state._id])


    const _setAvatar = (event: any) => {
        if (!event.target.files.length) {
            setAvatar(state.avatar)
            file.current = null
            return
        }
        file.current = event.target.files
        const reader = new FileReader()
        reader.readAsDataURL(file.current[0])
        reader.onloadend = () => setAvatar(reader.result)

    }

    const _onButton = async () => {
        if (!user.nickname.length) return Toast.offline('昵称不能为空哦!', 1.5)

        let i = 0
        for (let key in user) {
            // @ts-ignore
            i = state[key] === user[key] ? i + 1 : i
        }
        i = avatar === state.avatar ? i + 1 : i
        if (i === 4) return Toast.offline('明明都没有编辑过!', 1.5)

        Toast.loading('编辑中...', 0)
        let avatarUrl: string = ''
        if (file.current) {
            const res: any = await QiniuUpload.uploadImg({file: file.current[0], state})
            avatarUrl = res.key
        }
        const res = await UserRequest.Edit({
            history,
            nickname: user.nickname,
            one_sentence_introduction: user.one_sentence_introduction,
            gender: user.gender,
            introduction: user.introduction,
            avatar: avatarUrl
        })
        Toast.hide()
        if (!res) return
        if (res.state === 'err') Toast.fail(res.errMsg, 1.5)
        dispatch({
            type:'user/signIn',
            value:res.data
        })
        Toast.success('保存成功!', 1.5)
    }

    return (
        <Wrapper>
            <HeaderBar
                history={history}
                rightButton={<div onClick={_onButton}>保存</div>}
                title='编辑个人资料'
            />
            {
                user.load && (
                    <main>
                        <IconButton className={avatar === state.avatar ? 'avatar' : 'avatar hid'}>
                            <img src={avatar} alt="" />
                            <PhotoCamera />
                            <input
                                type='file'
                                onChange={_setAvatar}
                                accept='image/*'
                            />
                        </IconButton>
                        <h3>基本资料</h3>
                        <ul className='edit'>
                            <li>
                                <label>
                                    <span className='color-8590a6'>用户名</span>
                                    <input
                                        type="text"
                                        value={user.nickname}
                                        onChange={event => setUser({
                                            ...user,
                                            nickname: event.target.value
                                        })}
                                        maxLength={10}
                                    />
                                </label>
                            </li>
                            <li>
                                <label className='column'>
                                    <span className='color-8590a6'>
                                        一句话介绍 {!!user.one_sentence_introduction.length && `(${user.one_sentence_introduction.length}/30)`}
                                    </span>
                                    <input
                                        type="text"
                                        value={user.one_sentence_introduction}
                                        onChange={event => setUser({
                                            ...user,
                                            one_sentence_introduction: event.target.value
                                        })}
                                        placeholder='介绍自己的职业或兴趣'
                                        maxLength={30}
                                    />
                                </label>
                            </li>
                            <li>
                                <label>
                                    <span className='color-8590a6'>性别</span>
                                    男
                                    <Radio
                                        checked={user.gender === '1'}
                                        onChange={event => setUser({
                                            ...user,
                                            gender: event.target.value
                                        })}
                                        color="primary"
                                        value='1'
                                        name="gender"
                                    />
                                    女
                                    <Radio
                                        checked={user.gender === '0'}
                                        onChange={event => setUser({
                                            ...user,
                                            gender: event.target.value
                                        })}
                                        value='0'
                                        name="gender"
                                    />
                                </label>
                            </li>
                        </ul>
                        <h3>个人简介</h3>
                        <TextField
                            fullWidth
                            value={user.introduction}
                            onChange={event => setUser({...user, introduction: event.target.value})}
                            inputProps={{
                                maxLength: 200
                            }}
                            multiline
                        />
                    </main>
                )
            }
        </Wrapper>
    )
}

export default EditPeople
