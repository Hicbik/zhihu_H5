import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

interface Props {
    url: string
}

const QuestionAd: FC<Props> = ({url}) => (
    <Wrapper to='/asd'>
        <img src={url} alt='' />
    </Wrapper>
)


const Wrapper = styled(Link)`
width: 100%;
margin-bottom: 10px;
display:block;
img {
  width: 100%;
  height: auto;
  display:block;
}
`

export default QuestionAd
