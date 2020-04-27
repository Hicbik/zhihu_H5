import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
    LinkTo:any,
    content : any,
    title:any
}

const ContentBox: FC<Props> = ({LinkTo,content,title}) => {
    return (
        <Wrapper  onClick={LinkTo}>
            <p>{content}</p>
            <div className='question-title'>{title}</div>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
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
`

export default ContentBox
