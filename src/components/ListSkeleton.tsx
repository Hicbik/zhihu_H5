import React,{FC} from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import styled from 'styled-components'

const ListSkeleton:FC = () => (
    <Wrapper>
        <Skeleton />
        <Skeleton animation={false} />
        <Skeleton animation="wave" />
    </Wrapper>
)

const Wrapper = styled('div')`
width: 100%;
height: 120px;
padding: 15px;
border-top: 12px solid #f6f6f6;
border-bottom: 12px solid #f6f6f6;
`

export default ListSkeleton
