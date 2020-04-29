import React, { FC } from 'react'
import IconHao from './iconfont/IconHao'
import styled from 'styled-components'
import { ListItem } from '@material-ui/core'

interface Props {
    value: any,
    LinkTo: any,
    style?:any,
    children?:any
}

const PeopleListItem: FC<Props> = ({value, LinkTo ,style,children}) => {
    return (
        <Wrapper button onClick={LinkTo} style={style}>
            {children}
            <section>
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
            </section>
        </Wrapper>
    )
}

const Wrapper = styled(ListItem)`
padding: 12px;
&.MuiListItem-root {
  border-bottom: 12px solid #f6f6f6;
}
section {
  display:flex;
  align-items: center;
}
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
  border-radius: 50%;
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
  color: #1a1a1a
}
p:last-of-type {
  color: #8590a6;
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


export default React.memo(PeopleListItem)
