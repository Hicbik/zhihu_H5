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

    }

    static HaveRead ({_id}: { _id: string }) {
        const {User} = store.getState()
        this.socket.emit('HAVEREAD', {_id, userId: User._id})
    }

    static close () {
        this.socket.close()
    }
}

