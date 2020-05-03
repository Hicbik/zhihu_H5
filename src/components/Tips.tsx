import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../store/reducer'

const Tips = () => {
    const err = useTypedSelector(state => state.Notice.err)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch({
            type: 'notice/changeErr',
            value: false
        })
    }

    return (
        <Dialog open={err} style={{zIndex: 10086}} onClose={handleClose}>
            <DialogTitle>你的账号在其他设备上登录了!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    请重新登录
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>确认</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Tips
