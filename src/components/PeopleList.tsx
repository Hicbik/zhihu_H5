import React, {FC} from 'react'
import {List, ListItem} from '@material-ui/core'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import ListSkeleton from './ListSkeleton'
import IconHao from './iconfont/IconHao'
import {useList} from './QuestionList'

interface Props {
    Request: ({page}: { page: number }) => any,
    Highlight?: string,
    isShow?: boolean
}

const PeopleList: FC<Props> = ({Request, Highlight, isShow = true}) => {
    const history = useHistory()
    const {list, isLoad, ListRef, page} = useList({
        Request,
        Highlight,
        isShow,
        mapHighlight: (reg, data) => (
            data.map((value: any) => ({
                ...value,
                nickname: value.nickname.replace(reg, `<span class='red'>${Highlight}</span>`),
                one_sentence_introduction: value.one_sentence_introduction.replace(reg, `<span class='red'>${Highlight}</span>`),
            }))
        )
    })

    const ListItemLink = ({value}: { value: any }) => (
        <ListItem
            button
            component='section'
            className='item'
            onClick={() => setTimeout(() => history.push('/people/' + value._id), 500)}
        >
            <img src={value.avatar} alt="" />
            <div style={{flex: 1}}>
                <h2 dangerouslySetInnerHTML={{__html: value.nickname}} />
                <p dangerouslySetInnerHTML={{__html: value.one_sentence_introduction}} />
                <p>
                    <span>{value.reply_count} 回答</span>
                    <span> · </span>
                    <span>{value.question_count} 提问</span>
                    <span> · </span>
                    <span>{value.fans_count} 关注者</span>
                </p>
            </div>
            <LikeButton>
                <span>
                    <IconHao color='#0084ff' size={12} style={{marginRight: 5}} />关注
                </span>
            </LikeButton>
        </ListItem>
    )

    return (
        <Wrapper>
            <List component="nav" aria-label="main mailbox folders" style={{padding: 0}} ref={ListRef}>
                {list.map(value => <ListItemLink value={value} key={value._id} />)}
            </List>
            {isLoad && <ListSkeleton />}
            {
                !!list.length && list.length < page * 8 && !isLoad && (
                    <Tips>好像没有更多了哦!</Tips>
                )
            }
            {
                !list.length && !isLoad && (
                    <Tips>什么也没有找到呢</Tips>
                )
            }
        </Wrapper>
    )
}

const Wrapper = styled('div')`
width: 100%;
section.item {
  display:flex;
  padding: 12px;
  border-bottom: 12px solid #f6f6f6;
  &:last-of-type {
    border-bottom: none;
  }
  span.red {
    color: #f1403c;
  }
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    background-color: #fff;
    margin-right: 10px;
  }
  h2 {
    font-size: 16px;
    color: #1a1a1a;
  }
  p {
    font-size: 14px;
    margin-top: 4px;
  }
  p:first-of-type {
    color: #1a1a1a;

  }
  p:last-of-type {
    color: #8590a6;
  }
}
`
const LikeButton = styled('div')`
span {
  display:flex;
  width: 72px;
  height: 32px;
  justify-content: center;
  align-items: center;
  background: hsla(0,0%,60%,.08);
  color: #0084ff;
  border-radius: 5px;
  font-size: 14px;
  font-weight:bold;
}
`
const Tips = styled('div')`
font-size: 15px;
color: #888;
text-align:center;
margin: 30px;
`
export default PeopleList
