import React, {FC} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import IconArrowRight from '../../../components/iconfont/IconArrowRight'

const HotSearch: FC = () => {
    return (
        <Wrapper>
            <h2>热搜</h2>
            <Box>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8].map((value, index) => (
                        <Item key={value} to='/' index={index}>
                            <div className="num">{index + 1}</div>
                            <div className="content">
                                <p>南信大排查航班信息</p>
                                <p>具体发生了什么？</p>
                            </div>
                        </Item>
                    ))
                }
            </Box>
           <div className='all'>
               <Link to='/qu' className='color-0084ff'>更多热搜内容 <IconArrowRight color='#0084ff'/></Link>
           </div>
        </Wrapper>
    )
}

const Wrapper = styled('section')`
margin: 12px;
border-bottom: 1px solid #f6f6f6;
padding-bottom: 20px;
h2 {
  font-size: 16px;
  color: #1a1a1a;
  margin-bottom: 17px;
}
.all {
  margin: 10px auto 0;
  width: 120px;
  a {
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
}
`
const Box = styled('div')`
display:flex;
flex-wrap: wrap;
`
const Item = styled(Link)`
width: 50%;
display:flex;
margin-bottom: 20px;
.num {
  font-size: 15px;
  width: 18px;
  height: 18px;
  color: ${(props:{index:number})=>props.index > 2 ? '#bfbfbf' : '#ff942d'};
}
.content {
  flex: 1;
  overflow:hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  p {
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 10px;
  }
  p:first-of-type {
    color: #1a1a1a;
    font-size: 15px;
  }
  p:last-of-type {
    font-size: 13px;
    color: #999999;
    margin-top: 6px;
  }
}
`

export default HotSearch
