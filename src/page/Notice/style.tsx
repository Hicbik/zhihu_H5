import styled from 'styled-components'

export const Wrapper = styled('div')`
padding-top: 55px;
.MuiTab-wrapper {
  .MuiBadge-anchorOriginTopRightRectangle {
    transform: scale(1) translate(100%, -50%);
  }
  .MuiBadge-anchorOriginTopRightRectangle.MuiBadge-invisible {
    transform: scale(0) translate(100%, -50%);
  }
}
`
