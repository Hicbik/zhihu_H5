import React, {FC} from 'react'
import styled from 'styled-components'
import PrimaryButton from './PrimaryButton'

interface Props {
    text?: string
}

const OpenApp: FC<Props> = ({text}) => {
    return (
        <Wrapper >
            <PrimaryButton fullWidth disableElevation={false}>
                {text || '打开知乎 App，查看更多精彩讨论'}
            </PrimaryButton>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
width: 90%;
margin: 10px auto;
font-size: 14px;
height: 34px;
display:flex;
`

export default OpenApp
