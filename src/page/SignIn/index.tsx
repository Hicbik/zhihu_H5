import React, {FC, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Modal, Toast} from 'antd-mobile'
import {IconButton, Input, InputLabel, InputAdornment, FormControl, TextField} from '@material-ui/core'
import {Visibility, VisibilityOff} from '@material-ui/icons'
import {GlobalStyle, Wrapper, Header, ButtonBox} from './style'
import IconClose from '../../components/iconfont/IconClose'
import {UserRequest} from '../../utils/request'
import PrimaryButton from '../../components/PrimaryButton'


const {operation} = Modal

const SignIn: FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [type, setType] = useState('登录')
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        phone: '',
        password: '',
        verifyPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)

    const isDisabled = () => {
        if (type === '登录') return user.password.length > 5 && (/^1[3456789]\d{9}$/.test(user.phone))
        if (type === '注册') {
            return user.password.length > 5 && (/^1[3456789]\d{9}$/.test(user.phone)) && user.verifyPassword === user.password
        }
    }


    const _onButton = async () => {
        setLoading(true)
        const {phone, password} = user
        let res: any
        if (type === '注册') res = await UserRequest.signUp({phone, password})
        if (type === '登录') res = await UserRequest.signIn({phone, password})
        if (res.state === 'err') {
            Toast.fail(res.errMsg, 2.5)
            setLoading(false)
            return
        }
        dispatch({
            type: 'user/signIn',
            value: {...res.data}
        })
        localStorage.setItem('token', res.token)
        setLoading(false)
        Toast.success(type + '成功', 1.5, () => history.push('/'))
    }

    const setWin = () => {
        setUser({
            phone: '',
            password: '',
            verifyPassword: ''
        })
        setType(type === '登录' ? '注册' : '登录')
    }

    return (
        <Wrapper>
            <GlobalStyle />
            <Header>
                <h1>{type}知乎</h1>
                <p>发现更多可信赖的解答</p>
                <IconButton href='/' style={{position: 'absolute', right: 15, top: 15, fontWeight: 'bold', padding: 5}}>
                    <IconClose color='#fff' size={26} />
                </IconButton>
            </Header>
            <ButtonBox>
                <TextField
                    label='手机号'
                    value={user.phone}
                    onChange={event => setUser({...user, phone: event.target.value})}
                    fullWidth={true}
                    placeholder='输入手机号'
                />
                <FormControl fullWidth>
                    <InputLabel htmlFor="standard-adornment-password">密码</InputLabel>
                    <Input
                        placeholder='输入密码'
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={user.password}
                        onChange={event => setUser({...user, password: event.target.value})}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {
                    type === '注册' && (
                        <TextField
                            label='确认密码'
                            value={user.verifyPassword}
                            onChange={event => setUser({...user, verifyPassword: event.target.value})}
                            fullWidth={true}
                            placeholder='确认密码'
                            type='password'
                        />
                    )
                }
                <p className='color-8590a6' style={{marginBottom: 20}}>
                    注册即同意
                    <a href="/" className='color-8590a6'>《知乎协议》</a>
                    <a href="/" className='color-8590a6'>《隐私保护指引》</a>
                </p>
                <PrimaryButton
                    fullWidth
                    disableElevation
                    loading={loading}
                    disabled={!isDisabled()}
                    onClick={_onButton}
                >
                    {type}
                </PrimaryButton>

                <div style={{padding: '2px', display: 'flex', marginTop: 10}}>
                    <span className='color-175199' onClick={setWin}>
                        {type === '登录' ? '没有账号?去注册' : '已有账号?去登录'}
                    </span>
                    {
                        type === '登录' && (
                            <span
                                className='color-175199'
                                style={{marginLeft: 'auto'}}
                                onClick={() => operation([
                                    {text: '找回密码', onPress: () => console.log('标为未读被点击了')},
                                    {text: '人工申述', onPress: () => console.log('置顶聊天被点击了')},
                                    {
                                        text: '取消', onPress: () => {
                                        }, style: {
                                            color: '#8590a6',
                                        }
                                    },
                                ])}
                            >需要帮助</span>
                        )
                    }
                </div>
            </ButtonBox>
        </Wrapper>
    )
}

export default SignIn
