import React, { FC } from 'react'
import ListBase from './ListBase'
import PeopleListItem from './PeopleListItem'


interface Props {
    Request: ({page}: { page: number }) => any,
    Highlight?: string,
    upOnRefresh?: boolean
}

const PeopleList: FC<Props> = ({Request, Highlight, upOnRefresh = true}) => {

    return (
        <ListBase
            Highlight={Highlight}
            mapHighlight={(reg, data) => (
                data.map((value: any) => ({
                    ...value,
                    nickname: value.nickname.replace(reg, `<span class='red'>${Highlight}</span>`),
                    one_sentence_introduction: value.one_sentence_introduction.replace(reg, `<span class='red'>${Highlight}</span>`),
                }))
            )}
            RenderListItem={PeopleListItem}
            upOnRefresh={upOnRefresh}
            Request={Request}
            LinkTo={value => `/people/${value._id}`}
        />

    )
}


export default PeopleList
