import React, { FC, Fragment } from 'react'
import styled from 'styled-components'
import IconHao from './iconfont/IconHao'
import ListBase from './ListBase'


interface Props {
    Request: ({page}: { page: number }) => any,
    Highlight?: string,
    upOnRefresh?: boolean
}

const PeopleList: FC<Props> = ({Request, Highlight, upOnRefresh = true}) => {

    const ListLinkItem = ({value}: { value: any }) => {
        return (
            <Fragment>
                <img src={value.avatar} alt="" />
                <div style={{flex: 1}}>
                    <h2 dangerouslySetInnerHTML={{__html: value.nickname}} />
                    <p dangerouslySetInnerHTML={{__html: value.one_sentence_introduction}} />
                    <p>
                        <span>{value.reply_count} 回答</span>
                        <span> · </span>
                        <span>{value.question_count} 提问</span>
                        <span> · </span>
                        <span>{value.fans_count} 关注者</span>
                    </p>
                </div>
                <LikeButton>
                    <span><IconHao color='#0084ff' size={12} style={{marginRight: 5}} />关注</span>
                </LikeButton>
            </Fragment>
        )
    }

    return (
        <Wrapper>
            <ListBase
                Highlight={Highlight}
                mapHighlight={(reg, data) => (
                    data.map((value: any) => ({
                        ...value,
                        nickname: value.nickname.replace(reg, `<span class='red'>${Highlight}</span>`),
                        one_sentence_introduction: value.one_sentence_introduction.replace(reg, `<span class='red'>${Highlight}</span>`),
                    }))
                )}
                RenderListItem={({value}) => <ListLinkItem value={value} />}
                upOnRefresh={upOnRefresh}
                Request={Request}
                LinkTo={value => `/people/${value.id}`}
            />
        </Wrapper>

    )
}


const Wrapper = styled('div')`
width: 100%;
section.item {
  display:flex;
  padding: 12px;
  border-bottom: 12px solid #f6f6f6;
  &:last-of-type {
    border-bottom: none;
  }
  span.red {
    color: #f1403c;
  }
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    background-color: #fff;
    margin-right: 10px;
  }
  h2 {
    font-size: 16px;
    color: #1a1a1a;
  }
  p {
    font-size: 14px;
    margin-top: 4px;
  }
  p:first-of-type {
    color: #1a1a1a;

  }
  p:last-of-type {
    color: #8590a6;
  }
}
`

const LikeButton = styled('div')`
span {
  display:flex;
  width: 72px;
  height: 32px;
  justify-content: center;
  align-items: center;
  background: hsla(0,0%,60%,.08);
  color: #0084ff;
  border-radius: 5px;
  font-size: 14px;
  font-weight:bold;
}
`

export default PeopleList
