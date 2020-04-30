import { NoticeProps } from '../../../type'

const InitState = {
    unread: 0,
    full: {
        news: 0,
        agree: 0,
        attention: 0
    },
    online_users: 0,
    chat: 0,
    chatList: [],
    win: null
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
        case 'notice/chat':
            return {
                ...state,
                chatList: action.value.sort((a: { newMsg: number }, b: { newMsg: number }) => a.newMsg > b.newMsg ? -1 : 1),
                chat: action.chat
            }
        case 'notice/changeWin':
            return {
                ...state,
                win: action.value
            }
        case 'notice/delNewMsg':
            return {
                ...state,
                chatList: state.chatList.map(value => ({
                    ...value,
                    newMsg: value.user_id === action.user_id ? 0 : value.newMsg
                }))
            }
        default:
            return state
    }
}



