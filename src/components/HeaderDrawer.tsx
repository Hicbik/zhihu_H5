import React, { FC } from 'react'
import { Badge, List, ListItem, SwipeableDrawer } from '@material-ui/core'
import IconWenzhang from './iconfont/IconWenzhang'
import IconXie1 from './iconfont/IconXie1'
import IconWode from './iconfont/IconWode'
import IconTuichu from './iconfont/IconTuichu'
import IconTongzhi from './iconfont/IconTongzhi'
import IconXiaoxi21 from './iconfont/IconXiaoxi21'
import styled from 'styled-components'


interface Props {
    state: boolean,
    toggleDrawer: (state: boolean) => any,
    LinkTo: (value: string, full?: string) => any,
    onDropOut: () => void,
    user_id: string,
    unread: number,
    chat:number
}


const HeaderDrawer: FC<Props> = ({
    state,
    toggleDrawer,
    LinkTo,
    onDropOut,
    user_id,
    unread,
    chat
}) => {

    return (
        <Wrapper
            anchor='top'
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            disableSwipeToOpen={true}
        >
            <ModalSection>
                <ListItem button onClick={LinkTo('/')} component='li'>
                    <IconWenzhang color='#0084ff' size={23} style={{marginRight: 10}} />
                    首页
                </ListItem>
                <ListItem button onClick={LinkTo('/newQuestion')} component='li'>
                    <IconXie1 color='#0084ff' size={23} style={{marginRight: 10}} />
                    提个问题
                </ListItem>
                <ListItem button onClick={LinkTo('/people/', user_id)} component='li'>
                    <IconWode color='#0084ff' size={23} style={{marginRight: 10}} />
                    我的主页
                </ListItem>
                <ListItem button onClick={LinkTo('/Notice')} component='li'>
                    <Badge badgeContent={unread} color='secondary' max={99}>
                        <IconTongzhi color='#0084ff' size={23} style={{marginRight: 10}} />
                    </Badge>
                    我的消息
                </ListItem>
                <ListItem button onClick={LinkTo('/Chat')} component='li'>
                    <Badge badgeContent={chat} color='secondary' max={99}>
                        <IconXiaoxi21 color='#0084ff' size={23} style={{marginRight: 10}} />
                    </Badge>
                    我的私信
                </ListItem>
                <ListItem button onClick={onDropOut} component='li'>
                    <IconTuichu color='#0084ff' size={23} style={{marginRight: 10}} />
                    退出账号
                </ListItem>
            </ModalSection>
        </Wrapper>

    )
}

const Wrapper = styled(SwipeableDrawer)`
.MuiDrawer-paper {
  padding-top: 52px;
}
`

const ModalSection = styled(List)`
.MuiListItem-gutters {
  height: 50px;
  border-bottom: 1px solid #ebebeb;
  color: #0084ff;
}
.MuiBadge-badge {
  transform:scale(1) translate(0, -50%);
}
.MuiBadge-anchorOriginTopRightRectangle.MuiBadge-invisible {
  transform:scale(0) translate(0, -50%);
}
`

export default HeaderDrawer
