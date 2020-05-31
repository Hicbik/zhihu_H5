import React, { FC, useCallback } from 'react'
import { ListItem } from '@material-ui/core'
import styled from 'styled-components'
import ListBase from '../../../components/ListBase'
import { UserRequest } from '../../../utils/request'
import { NoticeIo } from '../../../utils/io'
import AvatarBox from './AvatarBox'
import ContentBox from './ContentBox'
import { useTypedSelector } from '../../../store/reducer'


const NoticeQuestionList: FC = () => {

    const state = useTypedSelector(state => state.User)

    const Request = useCallback(({page}) => {
        return UserRequest.getNotice({page, type: '消息'})
    }, [])

    const ListLinkItem = ({value, LinkTo}: { value: any, LinkTo: any }) => {


        const _onButton = () => {
            if (value.see) return
            setTimeout(() => NoticeIo.HaveRead({_id: value._id}), 1000)
        }

        const content = value.text === '回答了你的问题' ? value.question_id.title : `${state.nickname}：` + (
            value.text === '回复了你的评论' ? value.comment_id.content : value.reply_id.content
        )


        return (
            <ListItemWrapper button onClick={_onButton}>
                <AvatarBox value={value} />
                <ContentBox
                    LinkTo={LinkTo}
                    content={value.text === '回答了你的问题' ? value.res_reply_id.content : value.res_comment_id.content}
                    title={content}
                />
            </ListItemWrapper>
        )
    }


    return (
        <ListBase
            RenderListItem={ListLinkItem}
            Request={Request}
            LinkTo={value => `/question/${value.question_id._id}/answer/${value.reply_id ? value.reply_id._id : value.res_reply_id._id}`}
        />
    )
}

const ListItemWrapper = styled(ListItem)`
&.MuiListItem-root {
    display:block;
    border-bottom: 1px solid #f6f6f6;
    padding-top: 15px;
    padding-bottom: 15px;
}
.avatar {
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
}
`

export default NoticeQuestionList
