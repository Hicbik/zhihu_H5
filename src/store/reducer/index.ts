import {combineReducers} from 'redux'
import {useSelector, TypedUseSelectorHook} from 'react-redux'
import User from './User'
import {UserProps} from '../../type'

const rootReducer = combineReducers({
    User
})

export default rootReducer

interface PropsState {
    User: UserProps
}

export const useTypedSelector: TypedUseSelectorHook<PropsState> = useSelector
