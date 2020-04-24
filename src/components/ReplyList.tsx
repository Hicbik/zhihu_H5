import React, { FC } from 'react'
import ListBase from './ListBase'
import ReplyListItem from './ReplyListItem'

interface Props {
    Request: ({page}: { page: number }) => any,
    upOnRefresh?: boolean,
    user: any
}

const ReplyList: FC<Props> = ({Request, upOnRefresh = true, user}) => {

    return (
        <ListBase
            RenderListItem={ReplyListItem}
            LinkTo={value => `/question/${value.question_id._id}/answer/${value._id}`}
            Request={Request}
            upOnRefresh={upOnRefresh}
            user={user}
        />
    )
}


export default ReplyList











