import {UserProps} from '../../../type'

const InitState = {
    isLogin: false
}

export default (state: UserProps = InitState, action: any): UserProps => {
    switch (action.type) {
        case 'user/signIn':
            return {
                isLogin: true,
                _id: action.value._id,
                nickname: action.value.nickname,
                phone: action.value.phone,
                gender: action.value.gender,
                create_time: action.value.create_time,
                avatar: action.value.avatar,
                one_sentence_introduction: action.value.one_sentence_introduction,
                introduction: action.value.introduction,
                question_count: action.value.question_count,
                comment_count: action.value.comment_count,
                fans_count: action.value.fans_count,
                like_count: action.value.like_count,
                attention_count: action.value.attention_count,
                attention:action.value.attention
            }
        case 'user/dropOut':
            return {isLogin: false}
        default:
            return state
    }
}



