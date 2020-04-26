import React, { FC } from 'react'
import ListBase from './ListBase'
import QuestionListItem from './QuestionListItem'

interface Props {
    Request: ({page}: { page: number }) => any,
    Highlight?: string,
    upOnRefresh?: boolean,
    bgColor?: string
}


const QuestionList: FC<Props> = ({Request, Highlight, bgColor, upOnRefresh = true}) => {

    return (
        <ListBase
            RenderListItem={QuestionListItem}
            mapHighlight={data => {
                // eslint-disable-next-line
                const reg = eval(`/` + Highlight + '/')
                return data.map((value: any) => ({
                    ...value,
                    title: value.title.replace(reg, `<span class='red'>${Highlight}</span>`),
                    content: value.content.replace(reg, `<span class='red'>${Highlight}</span>`),
                    reply_id: value.reply_id.map((item: any) => ({
                        ...item,
                        reply: {
                            ...item.reply,
                            content: item.reply.content.replace(reg, `<span class='red'>${Highlight}</span>`)
                        }
                    }))
                }))
            }}
            upOnRefresh={upOnRefresh}
            Request={Request}
            LinkTo={value => `/question/${value._id}`}
            bgColor={bgColor}
        />
    )
}


export default QuestionList











