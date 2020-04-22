import React, {FC} from 'react'
import styled from 'styled-components'
import OpenApp from './OpenApp'
import IconXie from './iconfont/IconXie'
import ReplyItem from './ReplyItem'

interface Props {
    title: string,
    data: any[],
    openApp?: boolean,
    reply_count: number | undefined,
    user_id: string,
    showTitle?: boolean | undefined,
    question_user_id: string

}

const Reply: FC<Props> = ({title, data, openApp, question_user_id, reply_count, user_id, showTitle = true}) => {

    return (
        <Wrapper>
            {showTitle && <Header>{title}</Header>}
            {
                data.map(value => (
                    <ReplyItem
                        value={value}
                        key={value._id}
                        user_id={user_id}
                        question_user_id={question_user_id}
                    />
                ))
            }
            {openApp && reply_count! > 1 && <OpenApp text={`打开 App，查看全部 ${reply_count} 个回答`} />}
            {
                !reply_count && (
                    <div
                        style={{
                            margin: '50px 0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <IconXie size={80} color='rgb(235, 238, 245)' />
                        <p style={{color: '#8590A6', marginBottom: 20}}>还没有人回答哦!?</p>
                    </div>

                )
            }

        </Wrapper>
    )
}

const Wrapper = styled('div')`
background-color: #fff;
box-shadow: 0 1px 3px rgba(26,26,26,.1);
margin-bottom: 10px;
padding: 0 16px 8px;
`
const Header = styled('h4')`
font-weight: bold;
color: #1a1a1a;
height: 50px;
border-bottom: 1px solid #f6f6f6;
line-height: 50px;
vertical-align: middle;
`


export default Reply
