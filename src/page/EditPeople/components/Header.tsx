import React,{FC} from 'react'
import styled from 'styled-components'
import {IconButton} from '@material-ui/core'
import IconClose from '../../../components/iconfont/IconClose'

interface Props {
    history:any,
    onButton:()=>void
}

const Header:FC<Props> = ({history,onButton}) => {
    return (
        <Wrapper>
            <IconButton  onClick={()=>setTimeout(()=>history.goBack(),500)}>
                <IconClose size={26}/>
            </IconButton>
            <div>编辑个人资料</div>
            <div onClick={onButton}>保存</div>
        </Wrapper>
    )
}

const Wrapper = styled('header')`
background-color: #fff;
box-shadow: 0 1px 3px rgba(26,26,26,.1);
height: 53px;
display:flex;
align-items: center;
position: fixed;  
top: 0;
left: 0;
width: 100%;

div {
  color: #8590a6;
  font-size: 18px;
}
div:last-of-type {
  margin-left: auto;
  margin-right: 12px;
  color: #0084ff;
  font-size: 15px;
}
`

export default Header
