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
    attention?:string[]
}
