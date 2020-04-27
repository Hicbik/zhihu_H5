import { NoticeProps } from '../../../type'

const InitState = {
    unread: 0,
    full: {
        dynamic: 0,
        news: 0,
        agree: 0,
        attention: 0
    },
    online_users: 0
}

export default (state: NoticeProps = InitState, action: any): NoticeProps => {
    switch (action.type) {
        case 'notice/change' :
            return {
                ...state,
                ...action.value
            }
        case 'notice/online_users' :
            return {
                ...state,
                online_users: action.value
            }
        default:
            return state
    }
}



