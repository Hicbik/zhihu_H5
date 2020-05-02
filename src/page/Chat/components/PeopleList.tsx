import React, { FC } from 'react'
import { List, ListItem, Badge } from '@material-ui/core'
import styled from 'styled-components'
import { ChatTime } from '../../../utils/time'

interface Props {
    history: any,
    list: any[]
}

const PeopleList: FC<Props> = ({history, list}) => {

    const LinkTo = (id: string) => () => {
        setTimeout(() => history.push('/ChatDeal/' + id), 500)
    }

    return (
        <Wrapper>
            <List component='ul'>
                {
                    list.map(value => (
                        <ListItem button key={value.user_id} onClick={LinkTo(value.user_id)}>
                            <img src={value.avatar} alt="" />
                            <section>
                                <p>{value.nickname}
                                    <span>{ChatTime(value.messageList[value.messageList.length - 1].time)}</span>
                                </p>
                                <div className='Snippet'>
                                    <div className='text'>
                                        {value.messageList[value.messageList.length - 1].message}
                                    </div>
                                    <Badge
                                        component='div'
                                        badgeContent={value.newMsg}
                                        color='secondary'
                                        max={99}
                                    />
                                </div>
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
      display:flex;
      font-size: 14px;
      color: #999;
      .text {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-right: 35px;
      }
    }
  }
}

.MuiBadge-root {
  margin-left:auto;
  .MuiBadge-badge {
    right: -5px;
    top: 9px;
    padding: 0 4px;
    transform: scale(0.8) translate(-50%, -50%);
  }
  .MuiBadge-anchorOriginTopRightRectangle.MuiBadge-invisible {
    transform: scale(0) translate(-50%, -50%);
  }
}
`


export default PeopleList
