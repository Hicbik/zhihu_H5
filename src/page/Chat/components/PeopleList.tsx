import React, { FC } from 'react'
import { List, ListItem } from '@material-ui/core'
import styled from 'styled-components'

interface Props {
    history: any
}

const PeopleList: FC<Props> = ({history}) => {

    const LinkTo = (id: string) => () => {
        setTimeout(() => history.push('/ChatDeal/' + id), 500)
    }

    return (
        <Wrapper>
            <List component='ul'>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
                        <ListItem button key={value} onClick={LinkTo('asd')}>
                            <img src="https://pic4.zhimg.com/fd56780c37f0b316c56f27fe8b388532_100w.jpg" alt="" />
                            <section>
                                <p>知乎 <span>14:05</span></p>
                                <div className='Snippet'>亲爱的 研luo：从学生到职场社会人，身份的转变让许多人都表现出了极大的不适应~</div>
                            </section>
                        </ListItem>
                    ))
                }
            </List>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
.MuiListItem-root {
  border-bottom: 1px solid #f7f8fa;
  padding: 15px 12px;
  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  section {
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    p {
      display: flex;
      justify-content: space-between;
      color: #444;
      font-size: 15px;
      span {
        color: #999;
        font-size: 12px;
      }
    }
    .Snippet {
      flex: 1;
      font-size: 14px;
      color: #999;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
`


export default PeopleList
