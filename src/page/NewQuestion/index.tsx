import React, {FC, useState, useRef} from 'react'
import {Toast} from 'antd-mobile'
import ReactQuill from 'react-quill'
import {useHistory} from 'react-router-dom'
import {Wrapper, TitleInput, AddButton, TopicItem, Topic, TopicInput} from './style'
import PrimaryButton from '../../components/PrimaryButton'
import {QuestionRequest} from '../../utils/request'
import Header from '../../components/Header'
import IconHao from '../../components/iconfont/IconHao'
import IconClose from '../../components/iconfont/IconClose'
import '../../static/css/quill.css'

interface TopicProps {
    value: string,
    state: boolean,
    list: string[]
}

const NewQuestion: FC = () => {
    const history = useHistory()
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
        const res: any = await QuestionRequest.create({
            title,
            topic: topic.list,
            content,
            content_html: value,
            history
        })
        if (!res) return
        setLoading(false)
        Toast.success('发布成功!', 1.5, () => history.push('/question/' + res.data._id))
    }

    const _onAddTopicList = () => {
        if (!topic.value) return
        if (topic.list.includes(topic.value)) return Toast.fail('你已经添加过了!', 1.5)
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
                placeholder=' 写下你的问题，准确地描述问题更容易得到解答'
                value={title}
                onChange={event => setTitle(event.target.value)}
                autoFocus
            />
            <ReactQuill
                ref={quill}
                theme="snow"
                value={value}
                onChange={setValue}
                placeholder=' 对问题的描述说明，可以更快获得解答(当然不写也行)'
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
                                        添加话题（{!!topic.list.length ? `${topic.list.length}/5` : '至少添加一个话题'}）
                                    </AddButton>
                                )
                            }
                        </div>
                    ) : (
                        <div className='add-topic'>
                            <TopicInput
                                autoFocus
                                maxLength={20}
                                value={topic.value}
                                onChange={event => setTopic({...topic, value: event.target.value})}
                            />
                            <span className='color-0084ff' onClick={_onAddTopicList}>添加</span>
                        </div>
                    )
                }
            </Topic>
            <div style={{padding: 10}}>
                <PrimaryButton
                    fullWidth
                    disabled={isDisabled}
                    onClick={_onButton}
                    loading={loading}
                >
                    发布问题
                </PrimaryButton>

            </div>
        </Wrapper>
    )
}

export default NewQuestion
