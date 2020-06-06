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
    chatList: [
        {
            user_id: '666',
            chat_id: null,
            nickname: '知乎官方',
            avatar: 'https://p.ananas.chaoxing.com/star3/400_400c/c9ff4ff44d9355013346658e3c0ad714.png',
            messageList: [{type: 'he', message: '欢迎来到知乎!', time: 0}],
            newMsg: 0,
        }
    ],
    win: null,
    err: false
}

export default (state: NoticeProps = InitState, action: any): NoticeProps => {
    switch (action.type) {
        case 'notice/changeErr':
            return {
                ...state,
                err: action.value
            }
        case 'notice/6666': {
            return {
                ...state,
                chatList: state.chatList.map(
                    value => value.user_id === '666' ? {
                        ...value,
                        messageList: value.messageList.map(
                            (item, index) => index === 0 ? {
                                ...item,
                                time: action.time
                            } : item
                        )
                    } : value
                )
            }
        }
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
                chatList: action.value.sort((a: any, b: any) => a.newMsg > b.newMsg ? -1 : 1),
                chat: action.chat
            }
        case 'notice/addChatPeople':
            return {
                ...state,
                chatList: action.value,
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
                })),
                chat: state.chatList
                    .filter(value => value.user_id !== action.user_id)
                    .reduce((pre, next) => pre + next.newMsg, 0)
            }
        case 'notice/ClearNotice' :
            return {
                ...state,
                unread: 0,
                full: {
                    news: 0,
                    agree: 0,
                    attention: 0
                },
                chat: 0,
                chatList: state.chatList.map(value => ({...value, newMsg: 0}))
            }
        default:
            return state
    }
}



