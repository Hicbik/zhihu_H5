import React, { FC } from 'react'
import styled from 'styled-components'
import OpenApp from './OpenApp'
import { List, ListItem } from '@material-ui/core'


const data = [
    {
        'count': '32.1K',
        'questionId': 26289857,
        'title': '和不成熟男人谈恋爱是什么感觉？',
        'images': [
            'https://pic1.zhimg.com/8941d548ff691cb1e420567ce47e2943_hd.jpg',
            'https://pic4.zhimg.com/e33d86b685c9a105de20c20524694aa2_hd.jpg'
        ],
        'image': 'https://pic3.zhimg.com/8941d548ff691cb1e420567ce47e2943_hd.jpg',
        'type': 'questions',
        'answers': '1.7K'
    },
    {
        'count': '4.6K',
        'questionId': 25484765,
        'title': '如何识别女生是否使用了化妆品或化妆技术？',
        'images': [
            'https://pic1.zhimg.com/7e2d6d1fd5841374163445a95141a36a_hd.jpg',
            'https://pic1.zhimg.com/f5578069e8b5ff2395911a5b0a150534_hd.jpg'
        ],
        'image': 'https://pic1.zhimg.com/7e2d6d1fd5841374163445a95141a36a_hd.jpg',
        'type': 'questions',
        'answers': '120'
    },
    {
        'count': '33.4K',
        'questionId': 46626284,
        'title': '你身边有哪些神人？',
        'images': [
            'https://pic4.zhimg.com/v2-702f4d5c348cc6c7a89002032a15e7df_hd.jpg',
            'https://pic4.zhimg.com/v2-acec5569b49436e4d4f664f6892e8c96_hd.jpg',
            'https://pic4.zhimg.com/v2-54d14e92345971fb23dc1384de258b56_hd.jpg'
        ],
        'image': 'https://pic4.zhimg.com/v2-702f4d5c348cc6c7a89002032a15e7df_hd.jpg',
        'type': 'questions',
        'answers': '1.4K'
    },
    {
        'count': '1.2K',
        'questionId': 37988078,
        'title': '清纯的女孩应该是什么样子的？',
        'images': [
            'https://pic2.zhimg.com/v2-b6c8c76af1ae3c9d8251f7a9535d1587_hd.jpg',
            'https://pic4.zhimg.com/v2-5334cd19dbe4db14e1740611658be0ef_hd.jpg'
        ],
        'image': 'https://pic2.zhimg.com/v2-b6c8c76af1ae3c9d8251f7a9535d1587_hd.jpg',
        'type': 'questions',
        'answers': '165'
    },
    {
        'count': '46.5K',
        'questionId': 53304261,
        'title': '平时养成哪些小习惯，日积月累会带来很大好处？',
        'images': [
            'https://pic1.zhimg.com/v2-492b53665f1a22d43424bf036d9e94a5_hd.jpg',
            'https://pic2.zhimg.com/v2-142461853c6cb6d03326adfbdf8305e6_hd.jpg',
            'https://pic2.zhimg.com/v2-cd18e85afc155f281d2a48bbef9ba4f8_hd.jpg'
        ],
        'image': 'https://pic1.zhimg.com/v2-492b53665f1a22d43424bf036d9e94a5_hd.jpg',
        'type': 'questions',
        'answers': '706'
    },
    {
        'count': '208',
        'questionId': 280771287,
        'title': '《复联3》中，奇异博士预测未来和灭霸交手1400万次，只赢了一次，1400万是怎么算出来的？？',
        'images': [
            'https://pic2.zhimg.com/v2-00929436795c8ad12ac03725e1bb5550_hd.jpg',
            'https://pic2.zhimg.com/v2-391d9285f578aba21444082ef25423c9_hd.jpg',
            'https://pic1.zhimg.com/v2-1304eead7dd97583e27c19af8da9dfcf_hd.jpg'
        ],
        'image': 'https://pic2.zhimg.com/v2-00929436795c8ad12ac03725e1bb5550_hd.jpg',
        'type': 'questions',
        'answers': '55'
    },
    {
        'count': '3.1K',
        'questionId': 27291799,
        'title': '越来越容易讨厌一个人，接受不了别人开的恶意玩笑以及不尊重，是我自己变得狭隘了么？',
        'images': [
            'https://pic1.zhimg.com/aadd7b895_hd.jpg'
        ],
        'image': 'https://pic1.zhimg.com/aadd7b895_hd.jpg',
        'type': 'questions',
        'answers': '91'
    },
    {
        'count': '3.1K',
        'questionId': 283991217,
        'title': '你所见过最能代表中产阶级的生活方式是什么？',
        'images': [
            'https://pic1.zhimg.com/v2-edc5c14b800f298fb7404799bb07c175_hd.jpg',
            'https://pic2.zhimg.com/v2-6222167ec5772c1bdb9be71fac8053f8_hd.jpg',
            'https://pic2.zhimg.com/v2-90348d7372ffaf0d3d65b9c35935e4d6_hd.jpg'
        ],
        'image': 'https://pic1.zhimg.com/v2-edc5c14b800f298fb7404799bb07c175_hd.jpg',
        'type': 'questions',
        'answers': '191'
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
