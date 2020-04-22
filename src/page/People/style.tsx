import styled from 'styled-components'

export const Wrapper = styled('div')`
background-color: #f6f6f6;
padding-top: 50px;
.antd-button {
  min-width: 90px;
  padding: 0 16px;
  line-height: 32px;
  height: 32px;
  font-size: 14px;
  font-weight: bold;
  margin-top: 20px;
  border-radius: 3px;
  cursor: pointer;
}
`

export const UserWrapper = styled('div')`
color: #1a1a1a;
box-shadow: 0 1px 3px rgba(26,26,26,.1);
margin-bottom: 10px;
background-color: #fff;
.dianzan {
  display:flex;
  margin: 0 16px;
  padding: 10px 0;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
  span {
    font-size: 15px;
    font-weight: bold;
    margin-left: 10px;
  }
}
.like {
  display:flex;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
  span {
    width: 1px;
    height: 20px;
    background-color: #d3d3d3;
  }
  a {
    width: 49%;
    color: #1a1a1a;
    text-align:center;
  }
}
`

export const AvatarWrapper = styled('div')`
height: 300px;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: relative;
&::before {
  content: '';
  width: 100%;
  height: 125px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #565a63;
}
img {
  width: 135px;
  height: 135px;
  border-radius: 50%;
  position: relative;
  border: 5px solid #fff;
  z-index: 3;
}
h3 {
  font-size: 24px;
  display:flex;
  align-items: center;
}
`
