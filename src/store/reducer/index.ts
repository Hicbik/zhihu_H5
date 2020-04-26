import { combineReducers } from 'redux'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import User from './User'
import Notice from './Notice'
import { UserProps, NoticeProps } from '../../type'

const rootReducer = combineReducers({
    User, Notice
})

export default rootReducer

interface PropsState {
    User: UserProps,
    Notice: NoticeProps
}

export const useTypedSelector: TypedUseSelectorHook<PropsState> = useSelector
