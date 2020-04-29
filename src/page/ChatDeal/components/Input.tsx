import React,{FC,useState} from 'react'
import {TextareaAutosize } from '@material-ui/core'
import styled from 'styled-components'
import PrimaryButton from '../../../components/PrimaryButton'


const Input:FC = () => {

    const [value,setValue] = useState('')

    return (
        <Wrapper>
            <TextareaAutosize
                value={value}
                onChange={event => setValue(event.target.value)}
                rowsMax={6}
            />
           <div className='send-button'>
               <PrimaryButton >发送</PrimaryButton>
           </div>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
margin-top: auto;
width: 100%;
display:flex;
padding: 15px ;

.MuiButton-root {
  height: 38px;
  margin-top: auto;
}

.send-button {
  display:flex;
  flex-direction: column;
}

textarea {
  flex: 1;
  background-color: #fff;
  border-radius: 20px;
  padding: 10px;
  margin-right: 10px;
  border:none;
}
`

export default Input
