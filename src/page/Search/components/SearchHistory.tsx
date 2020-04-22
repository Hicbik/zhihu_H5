import React, {FC,useState} from 'react'
import styled from 'styled-components'
import {Schedule} from '@material-ui/icons'
import IconClose from '../../../components/iconfont/IconClose'

interface Props {
    onTapHistory: (historyValue: string) => void
}

const SearchHistory: FC<Props> = ({onTapHistory}) => {

    const [list, setList] = useState<string[]>(() => {
        return localStorage.getItem('historySearchList') ? JSON.parse(localStorage.getItem('historySearchList')!) : []
    })

    const _onDel = (index: number) => {
        const newList = list.filter(((value, index1) => index1 !== index))
        setList([...newList])
        localStorage.setItem('historySearchList', JSON.stringify(newList))
    }

    const _onDelAll = () => {
        setList([])
        localStorage.setItem('historySearchList', JSON.stringify([]))
    }

    return (
        <Wrapper>
            <h2>搜索历史{!!list.length && <span onClick={_onDelAll}>清空</span>}</h2>
            {
                list.map((value, index) => (
                    <Item key={value}>
                        <div className='history' onClick={() => onTapHistory(value)}>
                            <Schedule style={{color: '#d3d3d3'}} fontSize='small' />
                            <span>{value}</span>
                        </div>
                        <IconClose color='#d3d3d3' size={18} className='close' onClick={() => _onDel(index)} />
                    </Item>
                ))
            }
        </Wrapper>
    )
}

const Wrapper = styled('section')`
margin: 12px;
h2 {
  font-size: 16px;
  color: #1a1a1a;
  margin-bottom: 17px;
  display:flex;
  align-items: center;
  span {
    margin-left: auto;
    cursor: pointer;
    color: #999999;
    font-size: 13px;
    font-weight: normal;
  }
}
`
const Item = styled('div')`
border-bottom: 1px solid #000;
border-bottom: 1px solid #d3d3d3;
padding: 0 7px;
display:flex;
align-items: center;
height: 40px;
margin-top: 5px;
div.history {
  flex: 1;
  color: #1a1a1a;
  display:flex;
  align-items: center;
}
span {
  margin-left: 10px;
  font-size: 15px;
}
.close {
  margin-left: auto;
}
`

export default SearchHistory
