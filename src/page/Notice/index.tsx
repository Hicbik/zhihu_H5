import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Tabs, Tab } from '@material-ui/core'
import { Wrapper } from './style'
import HeaderBar from '../../components/HeaderBar'
import TabView from './components/TabView'
import QuestionList from './components/QuestionList'

const Notice: FC = () => {
    const history = useHistory()

    const [value, setValue] = useState(1)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
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
                <Tab label='动态' />
                <Tab label='消息' />
                <Tab label='赞同' />
                <Tab label='关注' />
            </Tabs>
            <TabView show={value === 0}>动态</TabView>
            <TabView show={value === 1}>
                <QuestionList />
            </TabView>
            <TabView show={value === 2}>赞同</TabView>
            <TabView show={value === 3}>关注</TabView>
            <TabView show={value === 4}>评论</TabView>
        </Wrapper>
    )
}


export default Notice
