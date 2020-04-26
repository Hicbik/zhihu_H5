import React, { FC, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Tabs } from 'antd-mobile'
import { QuestionRequest, UserRequest } from '../utils/request'
import ReplyList from '../components/ReplyList'
import PeopleQuestionList from '../components/PeopleQuestionList'
import DynamicList from './DynamicList'

interface Props {
    user: any
}

const PeopleTab: FC<Props> = ({user}) => {
    const height = document.documentElement.clientHeight - 53
    const [tabIndex, setTabIndex] = useState(0)

    const _onChangeTab = (tab: any, index: number) => {
        setTabIndex(index)
    }

    const ReplyRequest = useCallback(({page}) => {
        return QuestionRequest.PeopleReply({_id: user._id, page})
    }, [user._id])

    const QuestionListRequest = useCallback(({page}) => {
        return QuestionRequest.PeopleQuestion({_id: user._id, page})
    }, [user._id])


    const DynamicRequest = useCallback(({page}) => {
        return UserRequest.getDynamic({user_id: user._id, page})
    }, [user._id])

    return (
        <Wrapper>
            <Tabs
                tabs={[{title: '动态'}, {title: '回答'}, {title: '提问'}]}
                initialPage={0}
                tabBarActiveTextColor='#1a1a1a'
                tabBarInactiveTextColor='#999'
                onChange={_onChangeTab}
                swipeable={false}
            >
                <TabView height={height}>
                    <DynamicList Request={DynamicRequest} user={user} upOnRefresh={tabIndex === 0} />
                </TabView>
                <TabView height={height}>
                    <ReplyList Request={ReplyRequest} user={user} upOnRefresh={tabIndex === 1} />
                </TabView>
                <TabView height={height}>
                    <PeopleQuestionList Request={QuestionListRequest} upOnRefresh={tabIndex === 2} />
                </TabView>
            </Tabs>
        </Wrapper>
    )
}


const Wrapper = styled('div')`
.am-tabs-default-bar-content {
  box-shadow: 0 1px 3px rgba(26,26,26,.1);

  .am-tabs-default-bar-tab-active {
    font-weight: bold;
  }
}
`
const TabView = styled('div')`
display:flex;
min-height: ${(props: { height: number }) => props.height}px;
`

export default PeopleTab
