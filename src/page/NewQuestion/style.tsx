import styled from 'styled-components'

export const Wrapper = styled('div')`
padding-top: 60px;
`

export const TitleInput = styled('input')`
width: 100%;
padding: 15px;
border: none;
font-size: 15px;
&::placeholder {
  color: #8590a6;
}
`
export const Topic = styled('section')`
padding: 15px;
.topic-box {
  display:flex;
  flex-wrap: wrap;
}
.add-topic {
  display:flex;
  align-items: center;
  border-bottom: 1px solid #0084ff;

  span {
    width: 50px;
    text-align:center;
  }
}
`
export const TopicItem = styled('span')`
 background-color: rgba(0,132,255,.1);
 padding: 5px 12px;
 border-radius: 100px;
 color: #0084ff;
 display:flex;
 align-items: center;
 margin: 5px;

`

export const AddButton  =styled('button')`
color: #0084ff;
font-size: 16px;
background-color: transparent;
border: none;
display:flex;
align-items: center;
`
export const TopicInput= styled('input')`
border: none;
padding: 5px;
width: 200px;
flex:1;
`
