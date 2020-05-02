import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Tabs, Tab, Badge } from '@material-ui/core'
import { Wrapper } from './style'
import { useTypedSelector } from '../../store/reducer'
import HeaderBar from '../../components/HeaderBar'
import NoticeQuestionList from './components/NoticeQuestionList'
import AgreeList from './components/agreeList'
import AttentionList from './components/AttentionList'


const Notice: FC = () => {
    const history = useHistory()
    const state = useTypedSelector(state => state.Notice)

    const [value, setValue] = useState(0)

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
                <Tab label={<TabLabel badgeContent={state.full.news} text='消息' />} />
                <Tab label={<TabLabel badgeContent={state.full.agree} text='赞同' />} />
                <Tab label={<TabLabel badgeContent={state.full.attention} text='关注' />} />
            </Tabs>

            {value === 0 && <NoticeQuestionList />}
            {value === 1 && <AgreeList />}
            {value === 2 && <AttentionList />}
        </Wrapper>
    )
}


export default Notice
