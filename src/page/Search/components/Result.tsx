import React, {FC, useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import {Tabs} from 'antd-mobile'
import QuestionList from '../../../components/QuestionList'
import {QuestionRequest, UserRequest} from '../../../utils/request'
import PeopleList from '../../../components/PeopleList'


interface Props {
    value: string,
    count: number,
}

const Result: FC<Props> = ({value, count}) => {

    const height = document.documentElement.clientHeight - 53
    const [tabIndex, setTabIndex] = useState(0)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const Request = useCallback(({page}) => {
        return QuestionRequest.searchList({page, search: value})
        // eslint-disable-next-line
    }, [count])

    const PeopleRequest = useCallback(({page}) => {
        return UserRequest.search({page, search: value})
        // eslint-disable-next-line
    }, [count])

    const _onChangeTab = (tab: any, index: number) => {
        setTabIndex(index)
    }

    return (
        <Wrapper>
            <Tabs
                tabs={[{title: '综合'}, {title: '用户'}]}
                initialPage={0}
                tabBarUnderlineStyle={{display: 'none'}}
                tabBarActiveTextColor='#1a1a1a'
                tabBarInactiveTextColor='#999'
                destroyInactiveTab={true}
                onChange={_onChangeTab}
            >
                <TabView height={height}>
                    <QuestionList Request={Request} Highlight={value} isShow={tabIndex === 0} />
                </TabView>
                <TabView height={height}>
                    <PeopleList Request={PeopleRequest} Highlight={value} isShow={tabIndex === 1} />
                </TabView>
            </Tabs>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
.am-tabs-default-bar-content {
  box-shadow: 0 1px 3px rgba(26,26,26,.1);
  .am-tabs-default-bar-tab {
    width: auto !important;
    font-size: 15px;
    padding: 14px 0;
    margin: 0 12px;
  }
  .am-tabs-default-bar-tab-active {
    font-weight: bold;
  }

}
`

const TabView = styled('div')`
display:flex;
min-height: ${(props: { height: number }) => props.height}px;
`

export default Result
