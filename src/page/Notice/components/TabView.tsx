import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
    show: boolean,
    children: React.ReactNode
}

const TabView: FC<Props> = ({show, children}) => {
    return (
        <Wrapper>
            {show && children}
        </Wrapper>
    )
}

const Wrapper = styled('section')`

`

export default TabView
