import axios from 'axios'
import * as qiniu from 'qiniu-js'
import store from '../store'
import { Toast } from 'antd-mobile'


axios.defaults.baseURL = 'http://192.168.31.218:7001/'

// axios.defaults.baseURL = 'http://sujie.ink:7001/'

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) config.headers.Authorization = token
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

axios.interceptors.response.use(
    response => {
        return response.data
    }
)


class Base {
    static No_Login (history: any, callBack: () => any) {
        const {User} = store.getState()
        if (!User.isLogin) {
            Toast.offline('请先登录!', 1.5, () => history.push('/signIn'))
            return false
        }
        return callBack()
    }
}

export class UserRequest extends Base {
    static url = 'user/'

    static async Token () {
        const userToken = async () => {
            const token = localStorage.getItem('token')
            if (!token) return
            const res: any = await axios.post(this.url + 'Token')
            if (res.state === 'err') return localStorage.removeItem('token')
            store.dispatch({
                type: 'user/signIn',
                value: {...res.data}
            })
        }
        const uploadToken = async () => {
            const token = localStorage.getItem('qiniuToken')
            if (token) return
            const res: any = await axios.get('/qiniutoken')
            if (res.state === 'err') return localStorage.removeItem('qiniuToken')
            localStorage.setItem('qiniuToken', res.qiniuToken)
        }

        await Promise.all([
            userToken(),
            uploadToken()
        ])
    }

    static signUp ({phone, password}: { phone: string, password: string }) {
        return axios.post(this.url + 'signUp', {phone, password})
    }

    static signIn ({phone, password}: { phone: string, password: string }) {
        return axios.post(this.url + 'signIn', {phone, password})
    }

    static search ({page, search}: { page: number, search: string }) {
        return axios.get(this.url + 'search', {params: {page, search}})
    }

    static people ({_id}: { _id: string }): any {
        return axios.get(this.url + 'people', {params: {_id}})
    }

    static attention ({_id, type, history}: { _id: string, type: string, history: any }) {
        return this.No_Login(history, () => (
            axios.get(this.url + 'attention', {params: {_id, type}})
        ))
    }

    static Edit ({nickname, one_sentence_introduction, gender, introduction, history, avatar}: { nickname: string, one_sentence_introduction: string, gender: string, introduction: string, history: any, avatar?: string }) {
        return this.No_Login(history, () => (
            axios.post(this.url + 'Edit', {
                nickname,
                one_sentence_introduction,
                gender,
                introduction,
                avatar
            })
        ))
    }
}

export class QuestionRequest extends Base {
    static url = 'question/'

    static create ({title, content, content_html, topic, history, image_field}: { title: string, content: string, content_html: string, topic: string[], history: any, image_field: any[] }) {
        return this.No_Login(history, () => (
            axios.post(this.url + 'create', {title, content, content_html, topic, image_field})
        ))
    }

    static RecommendList ({page, type}: { page: number, type: string | undefined }) {
        return axios.get(this.url + 'RecommendList', {params: {page, type}})
    }

    static findOne ({_id}: { _id: string | undefined }) {
        return axios.get(this.url + 'findOne', {params: {_id}})
    }

    static createReplay ({content, content_html, question_id, history, image_field}: { content: string, content_html: string, question_id: string, history: any, image_field: any[] }) {
        return this.No_Login(history, () => (
            axios.post(this.url + 'createReply', {content, content_html, question_id, image_field})
        ))
    }

    static getReply ({question_id, reply_id}: { question_id: string | undefined, reply_id?: string }) {
        return axios.get(this.url + 'getReply', {params: {question_id, reply_id}})
    }

    static voters ({like, replay_id, history}: { like: { flag: string, type: string }, replay_id: string, history: any }) {
        return this.No_Login(history, () => (
            axios.post(this.url + 'voters', {like, replay_id})
        ))
    }

    static focus ({_id, type, history}: { _id: string, type: string, history: any }) {
        return this.No_Login(history, () => (
            axios.get(this.url + 'focus', {params: {_id, type}})
        ))
    }

    static searchList ({search, page}: { search: string, page: number }) {
        return axios.get(this.url + 'searchList', {params: {page, search}})
    }

    static PeopleReply ({_id,page}: { _id: string,page:number }) {
        return axios.get(this.url + 'PeopleReply', {params: {_id}})
    }
}

export class CommentRequest extends Base {
    static url = 'comment/'

    static create ({history, question_id, reply_id, content, type, Father_id, reply_user_id}: { history: any, question_id: string, reply_id: string, content: string, type: string, Father_id: string, reply_user_id?: string }) {
        return this.No_Login(history, () => (
            axios.post(this.url + 'create', {question_id, reply_id, content, type, Father_id, reply_user_id})
        ))
    }

    static findComment ({reply_id}: { reply_id: string }) {
        return axios.get(this.url + 'findComment', {params: {reply_id}})
    }

    static Like ({history, comment_id, type}: { history: any, comment_id: string, type: string }) {
        return this.No_Login(history, () => (
            axios.post(this.url + 'Like', {comment_id, type})
        ))
    }
}

export class QiniuUpload {
    static async uploadImg ({file, state}: { file: any, state: any }) {
        return new Promise((resolve, reject) => {
            const token: string = localStorage.getItem('qiniuToken')!
            // @ts-ignore
            const key = 'avatar/' + state._id + Date.now()
            const config = {
                useCdnDomain: true,
                region: qiniu.region.z0
            }
            const putExtra = {
                fname: file.name,
                params: {},
                mimeType: ['image/png', 'image/jpeg', 'image/jpg']
            }
            let observe = {
                next () {
                },
                error () {
                    reject()
                },
                complete (res: any) {
                    resolve(res)
                }
            }
            const observable = qiniu.upload(file, key, token, putExtra, config)
            observable.subscribe(observe)
        })
    }

    static async uploadQuestionImg ({file, state}: { file: any, state: any }) {
        return new Promise((resolve, reject) => {
            const token: string = localStorage.getItem('qiniuToken')!
            // @ts-ignore
            const key = `question/${state._id}/${Date.now()}`
            const config = {
                useCdnDomain: true,
                region: qiniu.region.z0
            }
            const putExtra = {
                fname: file.name,
                params: {},
                mimeType: ['image/png', 'image/jpeg', 'image/jpg']
            }
            let observe = {
                next () {
                },
                error () {
                    reject()
                },
                complete (res: any) {
                    resolve(res)
                }
            }
            const observable = qiniu.upload(file, key, token, putExtra, config)
            observable.subscribe(observe)
        })
    }

    static questionImg ({base64Data, state}: { base64Data: any, state: any }) {
        const dataURLtoFile = (base64Data: any) => {
            let arr = base64Data.split(','), mime = arr[0].match(/:(.*?);/)[1]
            let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new File([u8arr], 'filename', {type: mime})
        }
        const file = dataURLtoFile(base64Data)
        return new Promise((resolve, reject) => {
            this.uploadQuestionImg({file, state})
                .then(res => resolve(res))
        })
    }
}
