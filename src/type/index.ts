export interface UserProps {
    isLogin: boolean,
    _id?: string,
    nickname?: string,
    phone?: string,
    gender?: number,
    create_time?: Date,
    avatar?: string,
    one_sentence_introduction?: string,
    introduction?: string,
    question_count?: number,
    comment_count?: number,
    fans_count?: number,
    like_count?: number,
    attention_count?: number,
    attention?: string[]
}

export interface NoticeProps {
    unread: number,
    full: {
        news: number,
        agree: number,
        attention: number
    },
    online_users: number,
    chat: number,
    chatList: {
        user_id: string,
        avatar: string,
        nickname: string,
        chat_id: null | string,
        messageList: {
            type: string,
            message: string,
            time: any
        }[],
        newMsg: number
    }[],
    win: null | string,
    err:boolean
}

export interface HomeListProps {
    page: number,
    data: any [],
    isLoad: boolean,
    pageYOffset: number,
    PageState: boolean,
    type: undefined | string
}
