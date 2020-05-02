import React, { FC, useCallback } from 'react'
import { ListItem } from '@material-ui/core'
import styled from 'styled-components'
import ListBase from '../../../components/ListBase'
import { UserRequest } from '../../../utils/request'
import { NoticeIo } from '../../../utils/io'
import AvatarBox from './AvatarBox'
import ContentBox from './ContentBox'

const AgreeList: FC = () => {

    const Request = useCallback(({page}) => {
        return UserRequest.getNotice({page, type: '赞同'})
    }, [])

    const ListLinkItem = ({value, LinkTo}: { value: any, LinkTo: any }) => {

        const _onButton = () => {
            if (value.see) return
            setTimeout(() => NoticeIo.HaveRead({_id: value._id}), 1000)
        }

        return (
            <ListItemWrapper button onClick={_onButton}>
                <AvatarBox value={value}  />
                <ContentBox
                    LinkTo={LinkTo}
                    title={value.text === '赞同了你的回答' ? value.reply_id.content : value.comment_id.content}
                />
            </ListItemWrapper>
        )
    }

    return (
        <ListBase
            RenderListItem={ListLinkItem}
            Request={Request}
            LinkTo={value => `/question/${value.question_id._id}/answer/${value.reply_id._id}`}
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


export default AgreeList
