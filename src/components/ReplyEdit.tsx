import React, { FC, useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ReactQuill from 'react-quill'
import styled from 'styled-components'
import { Toast } from 'antd-mobile'
import PrimaryButton from './PrimaryButton'
import AuthorAvatar from './AuthorAvatar'
import '../static/css/quill.css'
import { QiniuUpload, QuestionRequest } from '../utils/request'


interface Props {
    question_id: string,
    nickname: string,
    avatar: string,
    one_sentence_introduction?: string,
    onReplySuccess: (_id: any, question: any) => void
}

const ReplyEdit: FC<Props> = ({question_id, nickname, avatar, one_sentence_introduction, onReplySuccess}) => {
    const history = useHistory()
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const quill: any = useRef(null)


    useEffect(() => {
        quill.current.focus()
    }, [])


    const _onButton = async () => {
        if (value.length === 0) return
        setLoading(true)
        if (loading) return
        const content = quill.current.getEditor().getText()


        const reg = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi
        const imgList: any[] = []
        const imgUrlList: any[] = []
        let index = -1
        value.replace(reg, (match, capture) => {
            imgList.push(capture)
            return match
        })

        for (let value of imgList) {
            const res: any = await QiniuUpload.questionImg({base64Data: value, state: {_id: question_id}})
            imgUrlList.push(`http://cdn.sujie.ink/${res.key}`)
        }

        const valueHtml = value.replace(reg, () => {
            index += 1
            return `<img src="${imgUrlList[index]}" alt="" />`
        })

        const res: any = await QuestionRequest.createReplay(
            {content, content_html: valueHtml, question_id, history,image_field:imgUrlList}
        )
        if (!res) return
        setLoading(false)
        Toast.success('回答成功!', 1.5, () => onReplySuccess(res.data._id, res.question))
    }

    return (
        <Wrapper>
            <div style={{padding: '0 15px'}}>
                <AuthorAvatar
                    nickname={nickname}
                    avatar={avatar}
                    one_sentence_introduction={one_sentence_introduction}
                />
            </div>
            <ReactQuill
                ref={quill}
                theme="snow"
                value={value}
                onChange={setValue}
                placeholder=' 写回答...'
                modules={{
                    toolbar: [
                        [
                            {'header': [1, 2, 3, 4, 5, 6, false]},
                            'bold',
                            'italic',
                            'underline',
                            'strike',
                            'blockquote',
                            {'list': 'bullet'},
                            'image'
                        ]
                    ],
                }}
                style={{minHeight: 320, borderBottom: '1px solid #ebebeb'}}
            />
            <div style={{display: 'flex', justifyContent: 'flex-end', padding: 10}}>
                <PrimaryButton
                    disabled={loading}
                    onClick={_onButton}
                >提交回答</PrimaryButton>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
box-shadow: 0 1px 3px rgba(26,26,26,.1);
margin-bottom: 10px;
background-color: #fff;
.ql-toolbar {
  border-bottom:1px solid #ebebeb;
  border-top:1px solid #ebebeb;
  padding-bottom: 8px;
}
.ql-editor {
  padding: 12px 15px;
}
`


export default ReplyEdit
