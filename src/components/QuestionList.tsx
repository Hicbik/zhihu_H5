import React, {FC, useState, useEffect, Fragment, useRef} from 'react'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import {List, ListItem} from '@material-ui/core'
import {DiffTime} from '../utils/time'
import ListSkeleton from './ListSkeleton'
import IconShangjiantou1 from './iconfont/IconShangjiantou1'
import IconXiajiantou1 from './iconfont/IconXiajiantou1'
import IconPinglun from './iconfont/IconPinglun'
import {useTypedSelector} from '../store/reducer'
import IconChakan from './iconfont/IconChakan'

interface Props {
    Request: ({page}: { page: number }) => any,
    Highlight?: string,
    isShow?: boolean
}

interface useProps extends Props {
    mapHighlight: (reg: any, data: any[]) => any[]
}


const useList = ({Request, Highlight, mapHighlight, isShow}: useProps) => {
    const ListRef: any = useRef(null)
    const [list, setList] = useState<any[]>([])
    const [isLoad, setIsLoad] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)
    const PageState = useRef(false)
    const show = useRef(true)

    useEffect(() => {
        show.current = isShow!
    }, [isShow])

    useEffect(() => {
        setIsLoad(true)
        setList([])
        setPage(1)
        PageState.current = false
    }, [Request])

    useEffect(() => {
        ;(async () => {
            let res: any = await Request({page})
            if (Highlight) {
                // eslint-disable-next-line
                const reg = eval(`/` + Highlight + '/')
                res.data = mapHighlight(reg, res.data)
            }
            page === 1 ? setList([...res.data]) : setList(prevState => ([...prevState, ...res.data]))
            if (res.data.length < 8) {
                setIsLoad(false)
                PageState.current = true
            } else {
                PageState.current = false
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, Request])

    useEffect(() => {
        window.addEventListener('scroll', _onScroll)
        return () => window.removeEventListener('scroll', _onScroll)
    }, [])

    const _onScroll = () => {
        if (!show.current) return
        if (PageState.current) return
        let windowHeight = document.documentElement.clientHeight
        let diffY = ListRef.current.getBoundingClientRect().bottom
        if (diffY <= windowHeight - 80) {
            PageState.current = true
            setPage(prevState => prevState + 1)
        }
    }

    return {
        list,
        isLoad,
        ListRef,
        page
    }

}

const QuestionList: FC<Props> = ({Request, Highlight, isShow = true}) => {
    const history = useHistory()
    const state = useTypedSelector(state => state.User)
    const {list, isLoad, ListRef, page} = useList({
        Request,
        Highlight,
        isShow,
        mapHighlight: (reg, data) => (
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
        )
    })

    const DefaultContent = ({value}: { value: any }) => (
        <Fragment>
            <section>
                <TextWrapper className={value.image_field && 'des'} dangerouslySetInnerHTML={{__html: value.content}} />
                {value.image_field && <img src={'https:' + value.image_field.url} className='small-img' alt='' />}
            </section>
            <Footer>
                {
                    value.topic.filter((value: any, index: number) => index < 2).map((value: any) => (
                        <Fragment key={value}>
                            <span>{value}</span>
                            <span className='point'>·</span>
                        </Fragment>
                    ))
                }
                <span>{DiffTime(value.create_time)} 发布</span>
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
                    className={value.image_field && 'des'}
                    dangerouslySetInnerHTML={{__html: value.reply_id[0].reply.content}}
                />
                {value.image_field && <img src={'https:' + value.image_field.url} className='small-img' alt='' />}
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
                    className={value.image_field && 'des'}
                    dangerouslySetInnerHTML={{__html: `${value.reply_id[0].user.nickname}： ${value.reply_id[0].reply.content}`}}
                />
                {value.image_field && <img src={'https:' + value.image_field.url} className='small-img' alt='' />}
            </section>
            <Footer style={{display: 'flex'}}>
                <Button>
                    <IconShangjiantou1 color='#0084ff' />
                    <span className='color-0084ff'>赞同</span>
                    <span
                        className='color-0084ff'
                    >{!!value.reply_id[0].reply.like_count && value.reply_id[0].reply.like_count}</span>
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

    const ListItemLink = ({value}: { value: any }) => (
        <ListItem
            button
            component='section'
            className='item'
            onClick={() => setTimeout(() => history.push('/question/' + value._id), 500)}
        >
            <h3 dangerouslySetInnerHTML={{__html: value.title}} />
            {
                !value.reply_count ? <DefaultContent value={value} /> : (
                    state.isLogin ? <ButtonContent value={value} /> : <AnswerContent value={value} />
                )
            }
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
        width: 112px;
        height: 74px;
        border-radius: 5px;
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
  padding-right: 15px;
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
`
const Tips = styled('div')`
font-size: 15px;
color: #888;
text-align:center;
margin: 30px;
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
export {useList}











