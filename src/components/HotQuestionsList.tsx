import React, {FC} from 'react'
import styled from 'styled-components'
import OpenApp from './OpenApp'
import {List, ListItem} from '@material-ui/core'


const data = [
    {
        'count': '2.5K',
        'questionId': 21145236,
        'title': '懒的本质是什么？',
        'images': [
            'https://pic1.zhimg.com/v2-36850c91de461b3d0058e6d600f15bcb_hd.jpg'
        ],
        'image': 'https://pic1.zhimg.com/v2-36850c91de461b3d0058e6d600f15bcb_hd.jpg',
        'type': 'questions',
        'answers': '215'
    },
    {
        'count': '62.5K',
        'questionId': 23265030,
        'title': '生活中有哪些偷懒技巧？',
        'images': [
            'https://pic1.zhimg.com/f93bb71a751416b82c736162c62af4a9_hd.jpg',
            'https://pic3.zhimg.com/v2-d8ad946359b35d24a58078f2baa6d4cf_hd.jpg',
            'https://pic3.zhimg.com/v2-20dd71c493511321047fb151c87d0c1a_hd.jpg'
        ],
        'image': 'https://pic1.zhimg.com/f93bb71a751416b82c736162c62af4a9_hd.jpg',
        'type': 'questions',
        'answers': '773'
    },
    {
        'count': '3.6K',
        'questionId': 50624580,
        'title': '哪一刻让你终于意识到了和对方是两个世界的人？',
        'images': [
            'https://pic1.zhimg.com/aadd7b895_hd.jpg'
        ],
        'image': 'https://pic1.zhimg.com/aadd7b895_hd.jpg',
        'type': 'questions',
        'answers': '402'
    },
    {
        'count': '42.6K',
        'questionId': 266020731,
        'title': '有哪些当时不懂后来才理解的电影台词或情节？',
        'images': [
            'https://pic1.zhimg.com/v2-e11eb97b56b11d82fe0340bc8187d00a_hd.jpg',
            'https://pic1.zhimg.com/v2-c7afe2ddf7f8b05d2b4f316aa6e2814d_hd.jpg',
            'https://pic2.zhimg.com/v2-677502469b246a00dc34114bf1c6b679_hd.jpg'
        ],
        'image': 'https://pic1.zhimg.com/v2-e11eb97b56b11d82fe0340bc8187d00a_hd.jpg',
        'type': 'questions',
        'answers': '1.5K'
    },
    {
        'count': '20.5K',
        'questionId': 34978955,
        'title': '你在游戏里见过最奇葩的 ID 是什么？',
        'images': [
            'https://pic1.zhimg.com/acf8ae583cd5dde440ae7e32e0776db3_hd.jpg',
            'https://pic1.zhimg.com/6913fc03c2af6fd01a91b37a0cb433cd_hd.jpg',
            'https://pic4.zhimg.com/51b4da3a2617f6b4d1f06bff3a97eb44_hd.jpg'
        ],
        'image': 'https://pic1.zhimg.com/acf8ae583cd5dde440ae7e32e0776db3_hd.jpg',
        'type': 'questions',
        'answers': '3.2K'
    },
    {
        'count': '5.8K',
        'questionId': 284081861,
        'title': '普吉岛翻船事故致 47 名中国游客遇难，现场情况是怎样的？为什么会发生这样的事故？',
        'images': [
            'https://pic2.zhimg.com/v2-edd86a19d1fc2403c004c8d4d75c0e53_hd.jpg',
            'https://pic1.zhimg.com/v2-2c071f52dd8940b13f789e994889ece8_hd.jpg',
            'https://pic4.zhimg.com/v2-a79b1a2efb51bc8cd7bf889e9c55191b_hd.jpg'
        ],
        'image': 'https://pic2.zhimg.com/v2-edd86a19d1fc2403c004c8d4d75c0e53_hd.jpg',
        'type': 'questions',
        'answers': '597'
    },
    {
        'count': '24.2K',
        'questionId': 36392454,
        'title': '男性从瘦弱到强壮、拥有一身肌肉是种怎样的体验？',
        'images': [
            'https://pic1.zhimg.com/v2-fdcd0962a08614c5bf13f557f8d5849c_hd.jpg',
            'https://pic1.zhimg.com/v2-d4b057503ee5c53a5b5739e7a7a98035_hd.jpg',
            'https://pic1.zhimg.com/v2-9c240a2d506d9194ea9a37dfe72211ed_hd.jpg'
        ],
        'image': 'https://pic1.zhimg.com/v2-fdcd0962a08614c5bf13f557f8d5849c_hd.jpg',
        'type': 'questions',
        'answers': '458'
    },
    {
        'count': '1.5K',
        'questionId': 51054463,
        'title': '关于上厕所，你有什么经验之谈？',
        'images': [
            'https://pic4.zhimg.com/v2-d78e2cd6e58df3d73555c27b701b2104_hd.jpg',
            'https://pic4.zhimg.com/v2-481da0627dddb17a72a9e1ad7328f1f2_hd.jpg',
            'https://pic3.zhimg.com/v2-630005a395d57414c7690c8afb649783_hd.jpg'
        ],
        'image': 'https://pic4.zhimg.com/v2-d78e2cd6e58df3d73555c27b701b2104_hd.jpg',
        'type': 'questions',
        'answers': '161'
    },
    {
        'count': '11.9K',
        'questionId': 23832593,
        'title': '爱一个人是什么感觉？',
        'images': [
            'https://pic1.zhimg.com/aadd7b895_hd.jpg'
        ],
        'image': 'https://pic1.zhimg.com/aadd7b895_hd.jpg',
        'type': 'questions',
        'answers': '2.6K'
    },
    {
        'count': '1.2K',
        'questionId': 62893802,
        'title': '怎样评价马伊琍和文章的婚姻?',
        'images': [
            'https://pic3.zhimg.com/v2-aef1830aa2bea20f636c5b73caa44248_hd.jpg',
            'https://pic1.zhimg.com/v2-b02d6494bfee6ed12953b0ade2d892e3_hd.jpg',
            'https://pic3.zhimg.com/v2-09c08ae12c6fd536b59747fac890afa6_hd.jpg'
        ],
        'image': 'https://pic3.zhimg.com/v2-aef1830aa2bea20f636c5b73caa44248_hd.jpg',
        'type': 'questions',
        'answers': '304'
    },
]

interface Props {
    history: any
}

const HotQuestionsList: FC<Props> = ({history}) => {
    return (
        <Wrapper>
            <Title>热门推荐</Title>
            <List component="nav" aria-label="main mailbox folders" style={{padding: 0}}>
                {
                    data.map(value => (
                        <ListItem
                            button
                            component='section'
                            className='item'
                            onClick={() => setTimeout(() => history.push('/question111'), 500)}
                            key={value.questionId}
                        >
                            <div className='contain'>
                                <h3>{value.title}</h3>
                                <p className='color-8590a6'>{value.count} 关注 · {value.answers} 回答</p>
                                {
                                    value.images && value.images.length > 1 && (
                                        <div className='img-box'>
                                            {
                                                value.images.map((img, index) => (
                                                    <img src={img} alt="" key={index} />
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </ListItem>
                    ))
                }
            </List>
            <OpenApp />
        </Wrapper>
    )
}

const Wrapper = styled('div')`
background-color: #fff;
padding-top: 25px;
padding-bottom: 30px;
box-shadow: 0 1px 3px rgba(26,26,26,.1);

section.item {
    padding: 16px;
    border-bottom: 1px solid #f6f6f6;
    .contain {
      h3 {
        color: #1a1a1a;
        font-size: 16px;
        margin-bottom: 4px;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        line-clamp: 2;
        box-orient: vertical;
      }
      p {
        font-size: 14px;
      }
    }
    .img-box {
      display:flex;
      margin-top: 12px;
      overflow:hidden;
      img {
        height: 74px;
        width: auto;
        border-radius: 4px;
        overflow:hidden;
        margin-right: 6px;
      }
    }
}
`
const Title = styled('div')`
font-weight: bold;
color:#1a1a1a;
margin: 0 16px 10px;
font-size: 17px;
`

export default HotQuestionsList
