import React, { FC, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { List } from '@material-ui/core'
import ListSkeleton from './ListSkeleton'


interface Props {
    Request: ({page}: { page: number }) => any,
    upOnRefresh?: boolean,
    mapHighlight?: (data: any[]) => any[]
}

interface ListProps extends Props {
    RenderListItem: any,
    LinkTo: (value: any) => string,
    user?: any,
    bgColor?: string,
    minorLinkTo?: (value: any) => string
}

const useList = ({Request, mapHighlight, upOnRefresh}: Props) => {
    const ListRef: any = useRef(null)
    const [list, setList] = useState<any[]>([])
    const [isLoad, setIsLoad] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)
    const PageState = useRef(false)
    const isUpOnRefresh = useRef(true)

    useEffect(() => {
        isUpOnRefresh.current = upOnRefresh!
    }, [upOnRefresh])

    useEffect(() => {
        setIsLoad(true)
        setList([])
        setPage(1)
        PageState.current = false
    }, [Request])

    useEffect(() => {
        ;(async () => {
            let res: any = await Request({page})
            if (mapHighlight) {
                res.data = mapHighlight(res.data)
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
        if (!isUpOnRefresh.current) return
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

const ListBase: FC<ListProps> = ({
    Request,
    upOnRefresh,
    mapHighlight,
    RenderListItem,
    LinkTo,
    user,
    minorLinkTo,
    bgColor = '#fff'
}) => {
    const history = useHistory()
    const {list, isLoad, ListRef, page} = useList({
        Request,
        upOnRefresh,
        mapHighlight
    })

    const ListItemLink = ({value}: { value: any }) => (
        <RenderListItem
            value={value}
            LinkTo={() => setTimeout(() => history.push(LinkTo(value)), 500)}
            minorLinkTo={() => setTimeout(() => history.push(minorLinkTo!(value)), 500)}
            user={user}
        />
    )

    return (
        <Wrapper bgColor={bgColor}>
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
background-color: ${(props: { bgColor: string }) => props.bgColor};

.MuiListItem-root {
  display:block;
}
`

const Tips = styled('div')`
font-size: 15px;
color: #888;
text-align:center;
margin: 30px;
`

export default ListBase











