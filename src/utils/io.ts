import io from 'socket.io-client'
import store from '../store'


export class NoticeIo {
    static socket: any

    static init () {
        const {User} = store.getState()

        this.socket = io('ws://192.168.31.218:7001/', {
            query: {
                userId: User._id
            },
            transports: ['websocket']
        })

        this.socket.emit('NOTICE', {_id: User._id})

        this.socket.on('NOTICE', (res: any) => {
            store.dispatch({
                type: 'notice/change',
                value: {
                    unread: res.unread,
                    full: res.full
                }
            })
        })

        this.socket.on('ONLINE_USERS', (res: any) => {
            store.dispatch({
                type: 'notice/online_users',
                value: res.online_users
            })
        })

        this.socket.on('CHAT', (res: any) => {
            const {send_user, message, time} = res
            this.addChatMessage({type: 'he', message, send_user, time})
        })

        this.GetChat()
    }


    static addChatMessage ({send_user, message, type, time}: { send_user: any, message: string, type: string, time: any }) {
        const {Notice} = store.getState()

        const userIndex = Notice.chatList.findIndex((value => value.user_id === send_user._id))

        if (userIndex === -1) {
            store.dispatch({
                type: 'notice/chat',
                value: [
                    ...Notice.chatList, {
                        user_id: send_user._id,
                        nickname: send_user.nickname,
                        avatar: send_user.avatar,
                        messageList: [{type, message, time}],
                        newMsg: Notice.win === send_user._id ? 0 : 1
                    }
                ],
                chat: Notice.win === send_user._id ? Notice.chat : Notice.chat + 1
            })
        } else {
            store.dispatch({
                type: 'notice/chat',
                value: Notice.chatList.map((value, index) => index === userIndex ? {
                        ...value,
                        messageList: [...value.messageList, {type, message, time}],
                        newMsg: Notice.win === send_user._id ? value.newMsg : value.newMsg + 1
                    } : value
                ),
                chat: Notice.win === send_user._id ? Notice.chat : Notice.chat + 1
            })
        }
        this.SaveChat()

    }

    static SaveChat () {
        const {Notice, User} = store.getState()
        localStorage.setItem('Chat', JSON.stringify({
            user_id: User._id,
            chatList: Notice.chatList,
            chat: Notice.chat
        }))
    }

    static GetChat () {
        const oldChat = localStorage.getItem('Chat')

        if (!oldChat) return

        const Chat = JSON.parse(oldChat)
        const {User} = store.getState()

        if (Chat.user_id === User._id) {
            store.dispatch({
                type: 'notice/chat',
                value: Chat.chatList,
                chat: Chat.chat
            })
        }

    }


    static SendChat ({send_user, receive_user_id, message}: { send_user: any, receive_user_id: string, message: string }) {
        const time = Date.now()
        this.socket.emit('CHAT', {
            send_user: {
                _id: send_user._id,
                avatar: send_user.avatar,
                nickname: send_user.nickname
            },
            receive_user_id,
            message,
            time
        })
        this.addChatMessage({type: 'my', send_user: {_id: receive_user_id}, message, time})
    }

    static HaveRead ({_id}: { _id: string }) {
        const {User} = store.getState()
        this.socket.emit('HAVEREAD', {_id, userId: User._id})
    }

    static close () {
        this.socket.close()
    }
}

