import React, { FC, useState, useEffect, Fragment, useRef } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { List, ListItem } from '@material-ui/core'
import { DiffTime } from '../utils/time'
import ListSkeleton from './ListSkeleton'
import IconShangjiantou1 from './iconfont/IconShangjiantou1'
import IconXiajiantou1 from './iconfont/IconXiajiantou1'
import IconPinglun from './iconfont/IconPinglun'
import { useTypedSelector } from '../store/reducer'
import IconChakan from './iconfont/IconChakan'

interface Props {
    Request: ({page}: { page: number }) => any,
    Highlight?: string,
    isShow?: boolean,
    mapHighlight?: (reg: any, data: any[]) => any[]
}

interface ListProps extends Props {
    RenderListItem: ({value}: { value: any }) => any,
    LinkTo: string
}

const useList = ({Request, Highlight, mapHighlight, isShow}: Props) => {
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
                res.data = mapHighlight!(reg, res.data)

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

const QuestionList: FC<ListProps> = ({
    Request,
    Highlight,
    isShow = true,
    mapHighlight,
    RenderListItem,
    LinkTo
}) => {
    const history = useHistory()
    const {list, isLoad, ListRef, page} = useList({
        Request,
        Highlight,
        isShow,
        mapHighlight
    })

    const ListItemLink = ({value}: { value: any }) => (
        <ListItem
            button
            component='section'
            className='item'
            onClick={() => setTimeout(() => history.push(LinkTo), 500)}
        >
            {RenderListItem({value})}
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
const Tips = styled('div')`
font-size: 15px;
color: #888;
text-align:center;
margin: 30px;
`


export default QuestionList
export { useList }











