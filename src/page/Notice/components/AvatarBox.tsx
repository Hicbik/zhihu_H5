import React, { FC } from 'react'
import styled from 'styled-components'
import { Badge } from '@material-ui/core'
import { DiffTime } from '../../../utils/time'

interface Props {
    value: any,
    LinkTo: any
}

const AvatarBox: FC<Props> = ({value, LinkTo}) => {
    return (
        // @ts-ignore
        <Wrapper color='secondary' variant='dot' component='div' invisible={value.see}>
            <div className='avatar-top' onClick={LinkTo}>
                <img src={value.res_user_id.avatar} alt="" />
                <div className="content">
                    <p>{value.res_user_id.nickname} <span>{value.text}</span></p>
                    <p className='color-8590a6'>{DiffTime(value.create_time)}</p>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled(Badge)`
display:flex;  
width: 100%;
align-items: center;
margin-bottom: 5px;
.avatar-top {
  display:flex;
}
img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-right: 10px;
}
.content {
  font-size: 14px;
  color: #808080;
  span {
    margin-left: 10px;
  } 
  p:last-of-type {
    font-size: 13px;
  }
}
`

export default React.memo(AvatarBox)
