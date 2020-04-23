import React, { FC, ReactChild } from 'react'
import { Button, ButtonProps, CircularProgress } from '@material-ui/core'
import styled from 'styled-components'

interface Props extends ButtonProps {
    loading?: boolean,
    children?: ReactChild,
    disableElevation?: boolean,
    fullWidth?: boolean,
    disabled?: boolean,
    onClick?: () => any,
    href?: string,
    style?: any,
    colorType?: string
}


const PrimaryButton: FC<Props> = ({
    loading,
    href,
    children,
    disabled = false,
    onClick,
    fullWidth,
    style,
    disableElevation = true,
    colorType = 'blue'
}) => {
    return (
        <Wrapper
            variant="contained"
            color="primary"
            disableElevation={disableElevation}
            fullWidth={fullWidth}
            disabled={disabled }
            onClick={onClick}
            href={href}
            style={style}
            colortype={colorType}
        >
            {loading && <CircularProgress size={22} />} {children}
        </Wrapper>
    )
}

const Wrapper = styled(Button)`
&.MuiButton-containedPrimary {
  background-color: ${(props: { colortype: string }) => props.colortype === 'blue' ? '#0084ff' : '#76839b'};
}
&.MuiButton-containedPrimary:hover {
  background-color: ${(props: { colortype: string }) => props.colortype === 'blue' ? '#0077e6' : '#8590a6'};
}
&.MuiButton-contained.Mui-disabled {
  opacity: 0.4;
  color: #fff;
  background-color: ${(props: { colortype: string }) => props.colortype === 'blue' ? '#0084ff' : '#76839b'};
}
.MuiCircularProgress-colorPrimary {
  color: #fff;
  margin-right: 0.5rem;
}
`

export default PrimaryButton
