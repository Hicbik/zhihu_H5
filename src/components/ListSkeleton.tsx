import React, { FC } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import styled from 'styled-components'

interface Props {
    bgColor: string
}

const ListSkeleton: FC<Props> = ({bgColor}) => (
    <Wrapper bgColor={bgColor}>
        <Skeleton />
        <Skeleton animation={false} />
        <Skeleton animation="wave" />
    </Wrapper>
)

const Wrapper = styled('div')`
width: 100%;
height: 120px;
padding: 15px;
border-top: 12px solid ${(props:{bgColor:string})=>props.bgColor};
border-bottom: 12px solid ${(props:{bgColor:string})=>props.bgColor};
background-color: #fff;
`

export default ListSkeleton
