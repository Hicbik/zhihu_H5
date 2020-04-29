import React, { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { List as MaterialList } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../store/reducer'
import ListSkeleton from '../../../components/ListSkeleton'
import QuestionListItem from '../../../components/QuestionListItem'


interface Props {
    Request: any,
    tab: undefined | string
}

const ListBase: FC<Props> = ({Request, tab}) => {

    const history = useHistory()
    const state = useTypedSelector(state => state.HomeList)
    const dispatch = useDispatch()
    const ListRef: any = useRef(null)

    const PageState = useRef(state.PageState)

    useEffect(() => {
        PageState.current = state.PageState
    }, [state.PageState])

    useEffect(() => {
        ;(async () => {
            if (tab === state.type) return
            const res = await Request({page: 1})
            dispatch({
                type: 'homeList/InitChangData',
                value: res.data,
                typeValue: tab
            })
        })()
        // eslint-disable-next-line
    }, [Request, dispatch, tab])

    useEffect(() => {
        if (!state.pageYOffset) return
        window.scrollTo(0, state.pageYOffset)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        ;(async () => {
            if (!state.PageState || state.page === 1) return
            const res = await Request({page: state.page})
            dispatch({
                type: 'homeList/changData',
                value: res.data
            })
        })()
        // eslint-disable-next-line
    }, [state.page, dispatch])

    useEffect(() => {
        window.addEventListener('scroll', _onScroll)
        return () => {
            window.removeEventListener('scroll', _onScroll)
            dispatch({
                type: 'homeList/changePageYOffset',
                pageYOffset: window.pageYOffset
            })
        }
        // eslint-disable-next-line
    }, [dispatch])

    const _onScroll = () => {
        if (PageState.current) return
        let windowHeight = document.documentElement.clientHeight
        let diffY = ListRef.current.getBoundingClientRect().bottom
        if (diffY <= windowHeight - 80) {
            dispatch({
                type: 'homeList/changePage'
            })
        }
    }


    const handleLinkTo = (value: any) => () => {
        setTimeout(() => history.push(`/question/${value._id}`), 500)
    }

    // @ts-ignore
    return (
        <Wrapper>

            <MaterialList
                component="nav"
                aria-label="main mailbox folders"
                style={{padding: 0}}
                ref={ListRef}
            >
                {
                    state.data.map(value => (
                            <QuestionListItem
                                value={value}
                                key={value._id}
                                LinkTo={handleLinkTo(value)}
                            />
                        )
                    )
                }
            </MaterialList>

            {state.isLoad && <ListSkeleton bgColor='#f6f6f6' />}
            {
                !!state.data.length && state.data.length < state.page * 8 && !state.isLoad && (
                    <Tips>好像没有更多了哦!</Tips>
                )
            }
            {
                !state.data.length && !state.isLoad && (
                    <Tips>什么也没有找到呢...要当第一个吃螃蟹的人吗?!</Tips>
                )
            }
        </Wrapper>
    )
}

const Wrapper = styled('div')`
width: 100%;
background-color: #f6f6f6;

.MuiListItem-root {
  display:block;
}
`

const Tips = styled('div')`
background-color: #fff;
font-size: 15px;
color: #888;
text-align:center;
padding: 30px;
`

export default React.memo(ListBase)











