import React, { FC } from 'react'
import styled from 'styled-components'
import ListBase from './ListBase'
import DynamicListItem from './DynamicListItem'


interface Props {
    Request: ({page}: { page: number }) => any,
    upOnRefresh?: boolean,
}

const DynamicList: FC<Props> = ({Request, upOnRefresh}) => {

    const LinkTo = (value: any) => {
        let to: string
        switch (value.type) {
            case '赞同了回答':
                return to = `/question/${value.reply_id.question_id._id}/answer/${value.reply_id._id}`
            case '关注了问题':
                return to = `/question/${value.question_id._id}`
            case '关注了用户':
                return to = `/people/${value.attention_user_id._id}`
            case '回答了问题':
                return to = `/question/${value.reply_id.question_id._id}/answer/${value.reply_id._id}`
            case '提出了问题' :
                return to = `/question/${value.question_id._id}`
        }
        // @ts-ignore
        return to
    }

    return (
        <Wrapper>
            <ListBase
                Request={Request}
                upOnRefresh={upOnRefresh}
                RenderListItem={DynamicListItem}
                LinkTo={value => LinkTo(value)}
            />
        </Wrapper>
    )
}

const Wrapper = styled('div')`
width: 100%;
background-color: #fff;
section.item {
    padding: 15px 15px;
    display:block;
    color: #1a1a1a;
    &:last-of-type {
      border-bottom: none;
    }
    h3 {
      font-size: 20px;
      color: #1a1a1a;
    }
    section {
      display:flex;
      flex: 1;
      padding-top: 11px;
      img.small-img {
        width: auto;
        height: 74px;
        border-radius: 5px;
        margin-left: 15px;
      }
    }
    span.red {
      color: #f1403c;
    }
    border-bottom: 1px solid #f6f6f6;
}
`


export default DynamicList
