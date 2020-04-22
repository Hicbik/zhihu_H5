import styled from 'styled-components'

export const Wrapper = styled('div')`
padding-top: 53px;

main {
  padding: 12px;
}

.avatar {
  position: relative;
  img {
     width: 80px;
     height: 80px;
     border-radius: 50%; 
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
  }
  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
  }
  &::before {
     content: "";
     position: absolute;
     border-radius: 50%;
     top: 50%;
     left: 50%;
     transform: translate(-50%,-50%);
     width: 80px;
     height: 80px;
     background-color: rgba(0,0,0,.3);
  }
      
}

h3 {
  color: #1a1a1a;
  font-weight: normal;
  margin: 10px 0;
}

ul.edit {
  margin-bottom: 10px;
  li {
    list-style: none;
    border-bottom: 1px solid #f6f6f6;
    height: 50px;
   margin: 10px 0;
    
   label {
     width: 100%;
     height: 100%;
     display:flex; 
     align-items: center;
     font-size: 15px;
     
     
     &.column {
      flex-direction: column;
      align-items: initial;
      
      span.color-8590a6 {
        width: auto;
        margin-bottom: 5px;
      }
      
      input {
        padding-left: 0;
      }
     }
     span.color-8590a6 {
      width: 100px;
      font-size: 15px;
     }
     
     input {
      border:none;
      font-size: 15px;
      flex: 1;
     }
   }
  }
}
`
