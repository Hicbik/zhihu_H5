import React, { FC, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const Loading: FC = () => {

    useEffect(() => {
        NProgress.start()
        return () => {
            NProgress.done()
        }
    }, [])

    return (
        <Wrapper>
            <CircularProgress
                variant="indeterminate"
                disableShrink
                thickness={4}
                style={{
                    color: '#6798e5',
                    animationDuration: '550ms',
                }}
            />
        </Wrapper>
    )
}

const Wrapper = styled('div')`
width: 100%;
height: 50px;
display:flex;
justify-content: center;
margin-top: 150px;
`

export default Loading
