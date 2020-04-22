import React, {FC , useCallback} from 'react'
import {useParams} from 'react-router-dom'
import {useTypedSelector} from '../../store/reducer'
import {Wrapper} from './style'
import Header from '../../components/Header'
import QuestionList from '../../components/QuestionList'
import {QuestionRequest} from '../../utils/request'

const Home: FC = () => {
    const {tab} = useParams()
    const state = useTypedSelector(state => state.User)

    const Request = useCallback(({page})=>{
        return QuestionRequest.RecommendList({type:tab,page})
    },[tab])

    return (
        <Wrapper style={{paddingTop: state.isLogin ? 60 : 108}}>
            <Header  isShowTab />
            <QuestionList  Request={Request} />
        </Wrapper>
    )
}

export default Home
