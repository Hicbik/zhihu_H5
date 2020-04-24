import React, { FC, Fragment } from 'react'
import styled from 'styled-components'
import PeopleQuestionListItem from './PeopleQuestionListItem'
import ReplyListItem from './ReplyListItem'
import PeopleListItem from './PeopleListItem'
import { DiffTime } from '../utils/time'


interface Props {
    value: any,
    LinkTo: any,
    user: any
}

const DynamicListItem: FC<Props> = ({value, LinkTo, user}) => {

    const Tips = () => {
        return (
            <TipsWrapper>
                <span>{value.type}</span>
                <span>{DiffTime(value.create_time)}</span>
            </TipsWrapper>
        )
    }

    const Question = () => {
        return (
            <PeopleQuestionListItem value={value.question_id} LinkTo={LinkTo}>
                <Tips />
            </PeopleQuestionListItem>
        )
    }

    const Reply = () => {
        return (
            <ReplyListItem
                value={value.reply_id}
                LinkTo={LinkTo}
                user={user}
            >
                <Tips />
            </ReplyListItem>
        )
    }

    const LikeReply = () => {
        return (
            <ReplyListItem value={value.reply_id} LinkTo={LinkTo} user={value.reply_id.user_id}>
                <Tips />
            </ReplyListItem>
        )
    }

    const LikePeople = () => {
        return (
            <PeopleListItem value={value.attention_user_id} LinkTo={LinkTo} style={{borderBottom: '1px solid #f6f6f6'}}>
                <Tips />
            </PeopleListItem>
        )
    }

    const NewQuestion = () => {
        return (
            <PeopleQuestionListItem value={value.question_id} LinkTo={LinkTo}>
                <Tips />
            </PeopleQuestionListItem>
        )
    }

    return (
        <Fragment>
            {value.type === '关注了问题' && <Question />}
            {value.type === '回答了问题' && <Reply />}
            {value.type === '赞同了回答' && <LikeReply />}
            {value.type === '关注了用户' && <LikePeople />}
            {value.type === '提出了问题' && <NewQuestion />}
        </Fragment>
    )
}

const TipsWrapper = styled('p')`
display:flex;
justify-content: space-between;
font-size: 15px;
color:#8590a6;
margin-bottom: 3px;
`

export default DynamicListItem
