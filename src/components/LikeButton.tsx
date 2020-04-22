import React, {FC, useEffect, useState} from 'react'
import styled from 'styled-components'
import IconShangjiantou1 from './iconfont/IconShangjiantou1'
import IconXiajiantou1 from './iconfont/IconXiajiantou1'
import {QuestionRequest} from '../utils/request'
import {useHistory} from 'react-router-dom'

interface Props {
    num?: number,
    like_id: string[],
    no_like_id: string[],
    user_id: string,
    replay_id: string
}

const LikeButton: FC<Props> = ({num, like_id, no_like_id, user_id, replay_id}) => {
    const history = useHistory()
    const [flag, setFlag] = useState('no')
    const [likeCount, setLikeCount] = useState(() => num!)

    useEffect(() => {
        setFlag(() => {
            if (like_id.includes(user_id)) return 'up'
            else if (no_like_id.includes(user_id)) return 'down'
            else return 'no'
        })
    }, [user_id, like_id, no_like_id])

    const _onButton = async (type: string) => {
        let flagNum: string
        let pType = type
        if (type !== flag && flag !== 'no') flagNum = '1'
        else if (type !== flag && flag === 'no') flagNum = '2'
        else if (type === flag) {
            type = 'no'
            flagNum = '3'
        }
        const res: any = await QuestionRequest.voters({history, like: {type: pType, flag: flagNum!}, replay_id})
        if (!res) return
        setFlag(type)
        setLikeCount(res.data.like_count)
    }

    return (
        <Wrapper>
            <Button className={flag === 'up' ? 'now' : ''} onClick={() => _onButton('up')}>
                <IconShangjiantou1 color={flag === 'up' ? '#fff' : '#0084ff'} />
                <span className='color-0084ff'>{flag === 'up' && '已'}赞同</span>
                <span className='color-0084ff'>{likeCount <= 0 ? '' : likeCount}</span>
            </Button>

            <Button className={flag === 'down' ? 'now' : ''} onClick={() => _onButton('down')}>
                <IconXiajiantou1 color={flag === 'down' ? '#fff' : '#0084ff'} />
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
 margin: 10px 0;
 display:flex;
`


const Button = styled('button')`
outline: none;
border: none;
background-color: rgba(0,132,255,.1);
border-radius: 3px;
display:flex;
justify-content: center;
align-items: center;
font-size: 14px;
font-weight: bold;
padding: 0 10px;
height: 32px;
margin-right: 8px;
vertical-align: middle;
&:last-of-type {
  margin-right: 0;
}
span {
  margin-left: 5px;
}
&.now {
  background-color: #0084ff;
  span {
    color: #fff;
  }
}
`

export default LikeButton
