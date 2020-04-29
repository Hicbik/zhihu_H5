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

    const ListLinkItem = ({value, LinkTo, minorLinkTo}: { value: any, LinkTo: any, minorLinkTo: any }) => {

        const _onButton = () => {
            if (value.see) return
            setTimeout(() => NoticeIo.HaveRead({_id: value._id}), 1000)
        }

        return (
            <ListItemWrapper button onClick={_onButton}>
                <AvatarBox value={value} LinkTo={minorLinkTo} />
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
            minorLinkTo={value => `/people/${value.res_user_id._id}`}
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
`


export default AgreeList
