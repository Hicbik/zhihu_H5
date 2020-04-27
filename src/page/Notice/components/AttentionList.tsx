import React, { FC, useCallback } from 'react'
import { ListItem } from '@material-ui/core'
import styled from 'styled-components'
import ListBase from '../../../components/ListBase'
import { UserRequest } from '../../../utils/request'
import { NoticeIo } from '../../../utils/io'
import AvatarBox from './AvatarBox'

const AttentionList: FC = () => {

    const Request = useCallback(({page}) => {
        return UserRequest.getNotice({page, type: '关注'})
    }, [])

    const ListLinkItem = ({value, LinkTo}: { value: any, LinkTo: any, minorLinkTo: any }) => {

        const _onButton = () => {
            if (value.see) return
            setTimeout(() => NoticeIo.HaveRead({_id: value._id}), 1000)
        }

        return (
            <ListItemWrapper button onClick={_onButton}>
                <AvatarBox LinkTo={LinkTo} value={value} />
            </ListItemWrapper>
        )
    }

    return (
        <ListBase
            RenderListItem={ListLinkItem}
            Request={Request}
            LinkTo={value => `/people/${value.res_user_id._id}`}
        />
    )
}

const ListItemWrapper = styled(ListItem)`
display:block;
border-bottom: 1px solid #f6f6f6;
padding-top: 15px;
padding-bottom: 15px;
div.comment {
  p {
    color: #646464;
    font-size: 14px;
    -webkit-line-clamp:2;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow:hidden;
    margin-bottom: 5px;
  }
  .question-title {
    font-size: 15px;
    background-color: #f6f6f6;
    padding: 5px 10px;
    border-radius: 5px;
    color: #646464;
  }
}
`


export default AttentionList
