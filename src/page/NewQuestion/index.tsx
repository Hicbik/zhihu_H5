import React, { FC, useRef, useState } from 'react'
import { Toast } from 'antd-mobile'
import ReactQuill from 'react-quill'
import { useHistory } from 'react-router-dom'
import { useTypedSelector } from '../../store/reducer'
import { AddButton, TitleInput, Topic, TopicInput, TopicItem, Wrapper } from './style'
import PrimaryButton from '../../components/PrimaryButton'
import { QiniuUpload, QuestionRequest } from '../../utils/request'
import Header from '../../components/Header'
import IconHao from '../../components/iconfont/IconHao'
import IconClose from '../../components/iconfont/IconClose'
import '../../static/css/quill.css'
import '../../static/css/dracula.min.css'


interface TopicProps {
    value: string,
    state: boolean,
    list: string[]
}

const NewQuestion: FC = () => {
    const history = useHistory()
    const state = useTypedSelector(state => state.User)
    const quill: any = useRef(null)
    const [value, setValue] = useState('')
    const [title, setTitle] = useState('')
    const [topic, setTopic] = useState<TopicProps>({
        value: '',
        state: true,
        list: []
    })
    const [loading, setLoading] = useState(false)

    const isDisabled = title.length < 5 || topic.list.length < 1

    const _onButton = async () => {
        setLoading(true)
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
            const res: any = await QiniuUpload.questionImg({base64Data: value, state})
            imgUrlList.push(`http://cdn.sujie.ink/${res.key}`)
        }

        const valueHtml = value.replace(reg, () => {
            index += 1
            return `<img src="${imgUrlList[index]}" alt="" />`
        })


        const res: any = await QuestionRequest.create({
            title,
            topic: topic.list,
            content,
            content_html: valueHtml,
            image_field: imgUrlList,
            history
        })
        if (!res) return
        setLoading(false)
        Toast.success('????????????!', 1.5, () => history.push('/question/' + res.data._id))
    }

    const _onAddTopicList = () => {
        if (!topic.value) return
        if (topic.list.includes(topic.value)) return Toast.fail('?????????????????????!', 1.5)
        setTopic({
            state: true,
            list: [...topic.list, topic.value],
            value: ''
        })
    }

    const _onDelTopicList = (index: number) => {
        setTopic({
            ...topic,
            list: [...topic.list.filter((value, i) => i !== index)]
        })
    }

    return (
        <Wrapper>
            <Header />
            <TitleInput
                placeholder=' ???????????????????????????????????????????????????????????????'
                value={title}
                onChange={event => setTitle(event.target.value)}
                autoFocus
            />
            <ReactQuill
                ref={quill}
                theme="snow"
                value={value}
                onChange={setValue}
                placeholder=' ???????????????????????????????????????????????????(??????????????????)'
                modules={{
                    toolbar: {
                        container: [
                            {'header': [1, 2, 3, 4, 5, 6, false]},
                            'bold',
                            'italic',
                            'underline',
                            'strike',
                            'blockquote',
                            'code-block',
                            {'list': 'bullet'},
                            'image',
                        ]
                    },
                    syntax: true
                }}

                style={{backgroundColor: '#fff', minHeight: 320}}

            />
            <Topic>
                {
                    topic.state ? (
                        <div className='topic-box'>
                            {
                                topic.list.map((value, index) => (
                                    <TopicItem key={value}>
                                        {value}
                                        <IconClose
                                            color='#0084ff'
                                            size={18}
                                            style={{marginLeft: 5}}
                                            onClick={() => _onDelTopicList(index)}
                                        />
                                    </TopicItem>
                                ))
                            }
                            {
                                topic.list.length < 5 && (
                                    <AddButton onClick={() => setTopic({...topic, state: false})}>
                                        <IconHao style={{marginRight: 5}} />
                                        ???????????????{!!topic.list.length ? `${topic.list.length}/5` : '????????????????????????'}???
                                    </AddButton>
                                )
                            }
                        </div>
                    ) : (
                        <div className='add-topic'>
                            <TopicInput
                                autoFocus
                                maxLength={10}
                                value={topic.value}
                                onChange={event => setTopic({...topic, value: event.target.value})}
                            />
                            <span className='color-0084ff' onClick={_onAddTopicList}>??????</span>
                        </div>
                    )
                }
            </Topic>
            <div style={{padding: 10}}>
                <PrimaryButton
                    fullWidth
                    disabled={isDisabled || loading}
                    onClick={_onButton}
                    loading={loading}
                    disableElevation={false}
                >
                    ????????????
                </PrimaryButton>

            </div>
        </Wrapper>
    )
}

export default NewQuestion
