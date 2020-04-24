import React, { FC } from 'react'
import ListBase from './ListBase'
import PeopleQuestionListItem from './PeopleQuestionListItem'

interface Props {
    Request: ({page}: { page: number }) => any,
    upOnRefresh?: boolean,
}

const PeopleQuestionList: FC<Props> = ({Request, upOnRefresh = true}) => {


    return (
            <ListBase
                RenderListItem={PeopleQuestionListItem}
                LinkTo={value => `/question/${value._id}`}
                Request={Request}
                upOnRefresh={upOnRefresh}
            />
    )
}



export default PeopleQuestionList











