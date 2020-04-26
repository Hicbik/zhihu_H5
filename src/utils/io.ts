import io from 'socket.io-client'
import store from '../store'

export const Notice = () => {
    const {User} = store.getState()
    const socket = io('ws://192.168.31.218:7001/', {
        query: {
            userId: User._id
        },
        transports: ['websocket']
    })

    socket.emit('NOTICE', {_id: User._id})

    socket.on('NOTICE', (res: any) => {
        store.dispatch({
            type: 'notice/change',
            value: {
                unread: res.unread
            }
        })
    })

    socket.on('ONLINE_USERS', (res: any) => {
        store.dispatch({
            type: 'notice/online_users',
            value: res.online_users
        })
    })


}
