import React, { FC, Fragment } from 'react'
import styled from 'styled-components'
import ListBase from './ListBase'
import { DiffTime } from '../utils/time'

interface Props {
    Request: ({page}: { page: number }) => any,
    upOnRefresh?: boolean,
}

const PeopleQuestionList: FC<Props> = ({Request, upOnRefresh = true}) => {

    const ListItemLink = ({value}: { value: any }) => {
        return (
            <Fragment>
                <div className='contain'>
                    <h3>{value.title}</h3>
                    <p className='color-8590a6'>
                        {DiffTime(value.create_time)} · {value.focus_problem_count} 个关注 · {value.reply_count} 个回答
                    </p>
                    {
                        value.images && value.images.length > 1 && (
                            <div className='img-box'>
                                {
                                    value.images.map((img: string, index: number) => (
                                        <img src={img} alt="" key={index} />
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </Fragment>
        )
    }

    return (
        <Wrapper>
            <ListBase
                RenderListItem={({value}) => <ListItemLink value={value} />}
                LinkTo={value => `/question/${value.question_id._id}/answer/${value._id}`}
                Request={Request}
                upOnRefresh={upOnRefresh}
            />
        </Wrapper>
    )
}

const Wrapper = styled('div')`
width: 100%;
background-color: #fff;
section.item {
    padding: 16px;
    border-bottom: 1px solid #f6f6f6;
    .contain {
      h3 {
        color: #1a1a1a;
        font-size: 20px;
        margin-bottom: 4px;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        line-clamp: 2;
        box-orient: vertical;
      }
      p {
        font-size: 14px;
      }
    }
    .img-box {
      display:flex;
      margin-top: 12px;
      overflow:hidden;
      img {
        height: 74px;
        width: auto;
        border-radius: 4px;
        overflow:hidden;
        margin-right: 6px;
      }
    }
}
`


export default PeopleQuestionList











