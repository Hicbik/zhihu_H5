import React, { FC, Fragment } from 'react'
import styled from 'styled-components'
import IconShangjiantou1 from './iconfont/IconShangjiantou1'
import IconXiajiantou1 from './iconfont/IconXiajiantou1'
import IconPinglun from './iconfont/IconPinglun'
import { ListItem } from '@material-ui/core'


interface Props {
    value: any,
    LinkTo: any,
    user: any,
    children:any
}

const ReplyListItem: FC<Props> = ({value, LinkTo, user,children}) => {
    const ButtonContent = () => {
        return (
            <Fragment>
                <section>
                    <TextWrapper
                        className={!!value.image_field.length ? 'des' : ''}
                    >
                        {value.content}
                    </TextWrapper>
                    {
                        !!value.image_field.length && (
                            <img src={value.image_field[0]} className='small-img' alt='' />
                        )
                    }
                </section>
                <Footer style={{display: 'flex'}}>
                    <Button>
                        <IconShangjiantou1 color='#0084ff' />
                        <span className='color-0084ff'>赞同</span>
                        <span className='color-0084ff'>
                        {!!value.like_count && value.like_count}
                    </span>
                    </Button>
                    <Button>
                        <IconXiajiantou1 color='#0084ff' />
                    </Button>
                    <BottomSpan>
                        <IconPinglun color='#8590a6' size={18} />
                        评论 {!!value.comment_count && value.comment_count}
                    </BottomSpan>
                </Footer>
            </Fragment>
        )
    }

    return (
        <Wrapper button onClick={LinkTo}>
            {children}
            <h3 dangerouslySetInnerHTML={{__html: value.question_id.title}} />
            <Avatar>
                <img src={user.avatar} alt='' />
                <div>
                    <p>{user.nickname}</p>
                    <p>{user.one_sentence_introduction}</p>
                </div>
            </Avatar>
            {
                !!value.like_count && (
                    <p className='color-8590a6' style={{fontSize: 14, marginTop: 10}}>{value.like_count} 人赞同了该回答</p>
                )
            }
            <ButtonContent />
        </Wrapper>
    )

}

const Wrapper = styled(ListItem)`
padding: 15px 15px;
display:block;
color: #1a1a1a;
&:last-of-type {
  border-bottom: none;
}
h3 {
  font-size: 20px;
  color: #1a1a1a;
}
section {
  display:flex;
  flex: 1;
  padding-top: 11px;
  img.small-img {
    width: auto;
    height: 74px;
    border-radius: 5px;
    margin-left: 15px;
  }
}
span.red {
  color: #f1403c;
}
border-bottom: 1px solid #f6f6f6;

`

const TextWrapper = styled('div')`
&.des {
  flex: 1;
  position: relative;
  -webkit-line-clamp: 3;
  height: 63px;
}
-webkit-line-clamp:2;
overflow:hidden;
font-size: 15px;
text-overflow: ellipsis;
-webkit-box-orient: vertical;
line-height: 21px;
display: -webkit-box;
`
const Footer = styled('div')`
font-size: 14px;
padding-top: 14px;
color: #999999;
.point {
  margin: 0 5px;
}
.mr5 {
  margin-right: 5px;
}
span.topic {
  color: #0084ff;
  background-color:  rgba(0,132,255,.1);
  padding: 0 8px;
  border-radius: 20px;
  margin-right: 3px;
}
`
const Button = styled('button')`
outline: none;
border: none;
background-color: rgba(0,132,255,.1);
border-radius: 3px;
display:flex;
justify-content: center;
align-items: center;
font-size: 14px;
font-weight: bold;
padding: 0 10px;
height: 32px;
margin-right: 8px;
vertical-align: middle;
&:last-of-type {
  margin-right: 0;
}
span {
  margin-left: 5px;
}
&.now {
  background-color: #0084ff;
  span {
    color: #fff;
  }
}
`
const BottomSpan = styled('div')`
display:flex;
align-items: center;
color: #8590a6;
font-size: 14px;
font-weight: bold;
margin-left: 10px;
svg {
  margin-right: 3px;
}
`
const Avatar = styled('div')`
display:flex;
img {
  width: 38px;
  height: 38px;
  border-radius: 2px;
  margin-right: 14px;
}
margin-top: 14px;
align-items: center;
p:first-of-type {
  font-size: 15px;
  font-weight:bold;
  color: #444;
}
p:last-of-type {
  font-size: 14px;
  color: #646464;
}
`

export default ReplyListItem
