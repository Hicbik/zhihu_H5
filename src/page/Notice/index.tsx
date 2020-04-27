import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Tabs, Tab, Badge } from '@material-ui/core'
import { Wrapper } from './style'
import { useTypedSelector } from '../../store/reducer'
import HeaderBar from '../../components/HeaderBar'
import TabView from './components/TabView'
import QuestionList from './components/QuestionList'
import AgreeList from './components/agreeList'
import AttentionList from './components/AttentionList'

const Notice: FC = () => {
    const history = useHistory()
    const state = useTypedSelector(state => state.Notice)

    const [value, setValue] = useState(1)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    const TabLabel = ({badgeContent, text}: { badgeContent: number, text: string }) => {
        return (
            <Badge badgeContent={badgeContent} color='secondary' max={99}>{text}</Badge>
        )
    }

    return (
        <Wrapper>
            <HeaderBar history={history} title='我的消息' />
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label={<TabLabel badgeContent={state.full.dynamic} text='动态' />} />
                <Tab label={<TabLabel badgeContent={state.full.news} text='消息' />} />
                <Tab label={<TabLabel badgeContent={state.full.agree} text='赞同' />} />
                <Tab label={<TabLabel badgeContent={state.full.attention} text='关注' />} />
            </Tabs>
            <TabView show={value === 0}>动态</TabView>
            <TabView show={value === 1}>
                <QuestionList />
            </TabView>
            <TabView show={value === 2}>
                <AgreeList />
            </TabView>
            <TabView show={value === 3}>
                <AttentionList />
            </TabView>
        </Wrapper>
    )
}


export default Notice
