import React, { FC, useCallback } from 'react'
import { ListItem, Badge } from '@material-ui/core'
import styled from 'styled-components'
import ListBase from '../../../components/ListBase'
import { UserRequest } from '../../../utils/request'
import { DiffTime } from '../../../utils/time'

const QuestionList: FC = () => {

    const Request = useCallback(({page}) => {
        return UserRequest.getNotice({page, type: '消息'})
    }, [])

    const ListLinkItem = ({value}: { value: any }) => {
        return (
            <ListItemWrapper button>
                <Badge color='secondary' variant='dot' component='div' className='avatar' invisible={value.see}>
                    <img src={value.res_user_id.avatar} alt="" />
                    <div className="content">
                        <p>{value.res_user_id.nickname} <span>{value.text}</span></p>
                        <p className='color-8590a6'>{DiffTime(value.create_time)}</p>
                    </div>
                </Badge>
                <div className='comment'>
                    <p>{value.res_comment_id.content}</p>
                    <div className='question-title'>{value.question_id.title}</div>
                </div>
            </ListItemWrapper>
        )
    }

    return (
        <ListBase
            RenderListItem={ListLinkItem}
            Request={Request}
            LinkTo={value => `/question/${value.question_id._id}`}
        />
    )
}

const ListItemWrapper = styled(ListItem)`
display:block;
border-bottom: 1px solid #f6f6f6;
padding-top: 15px;
padding-bottom: 15px;
div.avatar {
  display:flex;  
  align-items: center;
  margin-bottom: 5px;
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

export default QuestionList
