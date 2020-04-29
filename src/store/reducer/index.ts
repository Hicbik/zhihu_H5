import { combineReducers } from 'redux'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import User from './User'
import Notice from './Notice'
import HomeList from './HomeList'
import { UserProps, NoticeProps, HomeListProps } from '../../type'

const rootReducer = combineReducers({
    User, Notice, HomeList
})

export default rootReducer

interface PropsState {
    User: UserProps,
    Notice: NoticeProps,
    HomeList: HomeListProps
}

export const useTypedSelector: TypedUseSelectorHook<PropsState> = useSelector
