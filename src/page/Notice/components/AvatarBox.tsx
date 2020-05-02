import React, { FC } from 'react'
import { Badge } from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import { DiffTime } from '../../../utils/time'

interface Props {
    value: any,
}

const AvatarBox: FC<Props> = ({value}) => {


    const history = useHistory()

    const LinkTo = ()=>{
        setTimeout(()=>history.push(`/people/${value.res_user_id._id}`))
    }

    return (
        <Badge color='secondary' variant='dot' component='div' invisible={value.see} className='avatar'>
            <div className='avatar-top' onClick={LinkTo}>
                <img src={value.res_user_id.avatar} alt="" />
                <div className="content">
                    <p>{value.res_user_id.nickname} <span>{value.text}</span></p>
                    <p className='color-8590a6'>{DiffTime(value.create_time)}</p>
                </div>
            </div>
        </Badge>
    )
}



export default AvatarBox
