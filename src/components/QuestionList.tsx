import React, { FC, Fragment } from 'react'
import styled from 'styled-components'
import { DiffTime } from '../utils/time'
import IconShangjiantou1 from './iconfont/IconShangjiantou1'
import IconXiajiantou1 from './iconfont/IconXiajiantou1'
import IconPinglun from './iconfont/IconPinglun'
import IconChakan from './iconfont/IconChakan'
import ListBase from './ListBase'
import { useTypedSelector } from '../store/reducer'

interface Props {
    Request: ({page}: { page: number }) => any,
    Highlight?: string,
    upOnRefresh?: boolean
}


const QuestionList: FC<Props> = ({Request, Highlight, upOnRefresh = true}) => {

    const state = useTypedSelector(state => state.User)

    const DefaultContent = ({value}: { value: any }) => (
        <Fragment>
            <section>
                <TextWrapper
                    className={!!value.image_field.length ? 'des' : ''}
                    dangerouslySetInnerHTML={{__html: value.content}}
                />
                {
                    !!value.image_field.length && (
                        <img src={value.image_field[0]} className='small-img' alt='' />
                    )
                }
            </section>
            <Footer>
                {
                    value.topic.filter((value: any, index: number) => index < 2).map((value: any) => (
                        <span key={value} className='topic'>{value}</span>
                    ))
                }
                <span style={{marginLeft: 3}}>{DiffTime(value.create_time)} 发布</span>
                {
                    !!value.focus_problem_count && (
                        <Fragment>
                            <span className='point'>·</span>
                            <span>{value.focus_problem_count} 人关注了该问题</span>
                        </Fragment>
                    )
                }
            </Footer>
        </Fragment>
    )

    const AnswerContent = ({value}: { value: any }) => (
        <Fragment>
            <section>
                <TextWrapper
                    className={!!value.image_field.length ? 'des' : ''}
                    dangerouslySetInnerHTML={{__html: value.reply_id[0].reply.content}}
                />
                {
                    !!value.image_field.length && (
                        <img src={value.image_field[0]} className='small-img' alt='' />
                    )
                }
            </section>
            <Footer>
                <span>{value.reply_id[0].user.nickname} </span>的回答
                <span className='point'>·</span>
                <span className='mr5'>{value.reply_id[0].reply.like_count}</span>赞同
            </Footer>
        </Fragment>
    )

    const ButtonContent = ({value}: { value: any }) => (
        <Fragment>
            <section>
                <TextWrapper
                    className={!!value.reply_id[0].reply.image_field.length ? 'des' : ''}
                    dangerouslySetInnerHTML={{__html: `${value.reply_id[0].user.nickname}： ${value.reply_id[0].reply.content}`}}
                />
                {
                    !!value.reply_id[0].reply.image_field.length && (
                        <img src={value.reply_id[0].reply.image_field[0]} className='small-img' alt='' />
                    )
                }
            </section>
            <Footer style={{display: 'flex'}}>
                <Button>
                    <IconShangjiantou1 color='#0084ff' />
                    <span className='color-0084ff'>赞同</span>
                    <span className='color-0084ff'>
                        {!!value.reply_id[0].reply.like_count && value.reply_id[0].reply.like_count}
                    </span>
                </Button>
                <Button>
                    <IconXiajiantou1 color='#0084ff' />
                </Button>
                <BottomSpan>
                    <IconPinglun color='#8590a6' size={18} />
                    评论 {!!value.reply_id[0].reply.comment_count && value.reply_id[0].reply.comment_count}
                </BottomSpan>
                <BottomSpan>
                    <IconChakan color='#8590a6' size={18} />
                    游览 {value.view_count}
                </BottomSpan>
            </Footer>
        </Fragment>
    )

    const ListLinkItem = ({value}: { value: any }) => {
        return (
            <Fragment>
                <h3 dangerouslySetInnerHTML={{__html: value.title}} />
                {
                    !value.reply_count ? <DefaultContent value={value} /> : (
                        state.isLogin ? <ButtonContent value={value} /> : <AnswerContent value={value} />
                    )
                }
            </Fragment>
        )
    }

    return (
        <Wrapper>
            <ListBase
                RenderListItem={({value}) => <ListLinkItem value={value} />}
                mapHighlight={(reg, data) => (
                    data.map((value: any) => ({
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
                )}
                upOnRefresh={upOnRefresh}
                Request={Request}
                LinkTo={value => `/question/${value._id}`}
                Highlight={Highlight}
            />
        </Wrapper>
    )
}

const Wrapper = styled('div')`
width: 100%;
section.item {
    padding: 15px 15px;
    border-bottom: 12px solid #f6f6f6;
    display:block;
    color: #1a1a1a;
    &:last-of-type {
      border-bottom: none;
    }
    h3 {
      font-size: 17px;
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
}
`
const TextWrapper = styled('div')`
&.des {
  flex: 1;
  position: relative;
  -webkit-line-clamp: 3;
  height: 63px;
}
-webkit-line-clamp:2;
overflow:hidden;
font-size: 15px;
text-overflow: ellipsis;
-webkit-box-orient: vertical;
line-height: 21px;
display: -webkit-box;
`
const Footer = styled('div')`
font-size: 14px;
padding-top: 14px;
color: #999999;
.point {
  margin: 0 5px;
}
.mr5 {
  margin-right: 5px;
}
span.topic {
  color: #0084ff;
  background-color:  rgba(0,132,255,.1);
  padding: 0 8px;
  border-radius: 20px;
  margin-right: 3px;
}
`
const Button = styled('button')`
outline: none;
border: none;
background-color: rgba(0,132,255,.1);
border-radius: 3px;
display:flex;
justify-content: center;
align-items: center;
font-size: 14px;
font-weight: bold;
padding: 0 10px;
height: 32px;
margin-right: 8px;
vertical-align: middle;
&:last-of-type {
  margin-right: 0;
}
span {
  margin-left: 5px;
}
&.now {
  background-color: #0084ff;
  span {
    color: #fff;
  }
}
`
const BottomSpan = styled('div')`
display:flex;
align-items: center;
color: #8590a6;
font-size: 14px;
font-weight: bold;
margin-left: 10px;
svg {
  margin-right: 3px;
}
`


export default QuestionList











