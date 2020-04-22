import React, {FC, useState} from 'react'
import styled from 'styled-components'
import Logo from '../../../components/Logo'
import IconSousuo from '../../../components/iconfont/IconSousuo'
import {Link} from 'react-router-dom'
import {Wrapper, InputWrapper, Top} from '../../../components/Header'


interface Props {
    value: string,
    setValue: any,
    setShow: any,
    setCount: any
}

const Header: FC<Props> = ({value, setValue, setShow, setCount}) => {
    const [focus, setFocus] = useState(true)

    const _onKeySearch = (event: any) => {
        if (event.keyCode !== 13 || !value.length) return
        let HistorySearchList = localStorage.getItem('historySearchList')
        HistorySearchList = HistorySearchList ? JSON.parse(HistorySearchList) : []
        // @ts-ignore
        localStorage.setItem('historySearchList', JSON.stringify(Array.from(new Set([...HistorySearchList, value]))))
        setShow(false)
        setCount((prevState: number) => prevState + 1)
    }

    return (
        <Wrapper style={{zIndex: 12}}>
            <Top className='show'>
                <Logo />
                <InputBox>
                    <input
                        type="search"
                        placeholder='美国确诊数全球第一'
                        className={focus ? 'focus' : ''}
                        autoFocus
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        onKeyDown={_onKeySearch}
                    />
                    <IconSousuo size={20} color='#999' />
                </InputBox>
                <Link to='/' className='color-0084ff login'>取消</Link>
            </Top>
        </Wrapper>
    )
}


const InputBox = styled(InputWrapper)`
input {
  transition: all .3s;
  text-overflow: initial;
  &.focus {
    background-color: #fff;
    border: 1px solid #8590a6;
  }
}
`
export default Header
