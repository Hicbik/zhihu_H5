import styled,{createGlobalStyle} from 'styled-components'


export const GlobalStyle = createGlobalStyle`
.am-modal-transparent {
  width: 87.2%;
}
.am-modal.am-modal-operation .am-modal-content {
  border-radius: 2px;
}
.am-modal.am-modal-operation .am-modal-content .am-modal-button {
  padding-left: 0;
  height: 57px;
  line-height: 57px;
  font-size: 16px;
  color: #1a1a1a;
  text-align: center;
}
`

export const Wrapper = styled('div')``

export const Header = styled('header')`
height: 108px;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #0084ff;
color: #fff;
position: relative;
h1 {
  font-size: 25px;
  font-weight:normal;
}
`

export const ButtonBox = styled('form')`
padding: 15px;
.MuiTextField-root {
  height: 50px;
  margin-top: 10px;
  margin-bottom: 5px;
  padding-bottom: 5px;
}
.MuiInput-underline:before {
  border-bottom-color: #ebebeb;
}
p {
  text-align:center;
  font-size: 12px;
  &:first-of-type {
    margin-top: 20px;
  }
  a {
    text-decoration: underline;
  }
}
`
