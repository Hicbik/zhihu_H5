import React, {FC} from 'react'
import styled from 'styled-components'

const Footer: FC = () => {
    return (
        <Wrapper>
            <p>由Ts+React+Egg.js+MongoDB驱动</p>
            <p>迷茫是什么?迷茫就是大事干不了,小事不想干,能力配不上欲望,才华配不上梦想。</p>
            <p>© 2020 知乎 内测版 v0.0.1</p>
        </Wrapper>
    )
}

const Wrapper = styled('footer')`
text-align:center;
margin: 60px 0;
p {
  font-size: 13px;
  width: 80%;
  color: #8590a6;
  line-height: 1.2;
  margin:5px auto;
}
`

export default Footer
