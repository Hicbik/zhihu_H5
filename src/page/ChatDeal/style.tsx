import styled  ,{createGlobalStyle} from 'styled-components'


export const GlobalStyle = createGlobalStyle`
html ,body ,#root{
  height: 100%;
 
}
`

export const Wrapper = styled('div')`
padding-top: 53px;
display:flex;
flex-direction: column;
height: 100%;
background-color: #f6f6f6;
`
