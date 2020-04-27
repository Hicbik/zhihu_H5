import React, { Fragment, FC } from 'react'
import styled from 'styled-components'
import { DiffTime } from '../utils/time'
import IconShangjiantou1 from './iconfont/IconShangjiantou1'
import IconXiajiantou1 from './iconfont/IconXiajiantou1'
import IconPinglun from './iconfont/IconPinglun'
import { ListItem } from '@material-ui/core'
import { useTypedSelector } from '../store/reducer'

interface Props {
    value: any,
    LinkTo: any
}

const QuestionListItem: FC<Props> = ({value, LinkTo}) => {
    const state = useTypedSelector(state => state.User)

    const DefaultContent = () => (
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

    const AnswerContent = () => (
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

    const ButtonContent = () => (
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
                    {!!value.reply_id[0].reply.comment_count ? `评论 ${value.reply_id[0].reply.comment_count}` :'暂无评论'}
                </BottomSpan>
                <BottomSpan>
                    游览 {value.view_count}
                </BottomSpan>
            </Footer>
        </Fragment>
    )

    return (
        <Wrapper button onClick={LinkTo}>
            <h3 dangerouslySetInnerHTML={{__html: value.title}} />
            {
                !value.reply_count ? <DefaultContent /> : (
                    state.isLogin ? <ButtonContent /> : <AnswerContent />
                )
            }
        </Wrapper>
    )

}

const Wrapper = styled(ListItem)`
&.MuiListItem-root {
    background-color: #fff;
    padding: 15px 15px;
    margin-bottom: 12px;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    display:block;
    color: #1a1a1a;
}
&:last-of-type {
  margin-bottom: 0;
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
padding: 0 6px;
height: 28px;
margin-right: 8px;
vertical-align: middle;
&:last-of-type {
  margin-right: 0;
}
span {
  margin-left: 5px;
}
`
const BottomSpan = styled('div')`
display:flex;
align-items: center;
color: #8590a6;
font-size: 14px;
margin-left: 10px;
svg {
  margin-right: 3px;
}
`

export default React.memo(QuestionListItem)
