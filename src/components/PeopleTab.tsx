import React, {FC, useState} from 'react'
import styled from 'styled-components'

const PeopleTab: FC = () => {
    const nav = ['动态', '回答', '文章', '提问']
    const [active, setActive] = useState(() => nav[0])
    return (
        <Wrapper>
            <TabNav>
                {
                    nav.map(value => (
                        <span
                            key={value} className={active === value ? 'active' : ''}
                            onClick={() => setActive(value)}>{value}</span>
                    ))
                }
            </TabNav>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
background-color: #fff;
color: #1a1a1a;
`
const TabNav = styled('nav')`
display:flex;
span {
  width: 25%;
  text-align:center;
  padding: 14px 0;
  border-bottom: 2px solid #f6f6f6;
  &.active {
    border-bottom-color: #0084ff;
    font-weight:bold;
  }
}
`


export default PeopleTab
