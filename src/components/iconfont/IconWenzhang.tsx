/* tslint:disable */
/* eslint-disable */

import React, { CSSProperties, DOMAttributes, FunctionComponent } from 'react';
import { getIconColor } from './helper';

interface Props extends DOMAttributes<SVGElement> {
  size?: number;
  color?: string | string[];
  style?: CSSProperties;
  className?: string;
}

const DEFAULT_STYLE: CSSProperties = {
  display: 'block',
};

export const IconWenzhang: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M827.127742 141.807484l-9.909677-9.249032v798.356645H206.781935V93.084903h568.154839l-6.606451-6.044903L674.849032 0H174.37729A59.458065 59.458065 0 0 0 115.612903 60.019613v903.960774A59.458065 59.458065 0 0 0 174.37729 1024h675.24542A59.458065 59.458065 0 0 0 908.387097 963.980387V217.484387z m-124.399484 466.514581H321.271742a46.542452 46.542452 0 0 1 0-93.084904h381.456516a46.542452 46.542452 0 0 1 0 93.084904z m0 198.854193H321.271742a46.575484 46.575484 0 0 1 0-93.084903h381.456516a46.575484 46.575484 0 0 1 0 93.084903z m-301.518452-424.398452H305.118968a27.614968 27.614968 0 0 1-27.317678-27.879225V256.72671a27.614968 27.614968 0 0 1 27.317678-27.879226h96.123871a27.614968 27.614968 0 0 1 27.317677 27.879226v98.171871a27.614968 27.614968 0 0 1-27.35071 27.879225zM908.387097 217.484387v42.116129h-251.837936a27.218581 27.218581 0 0 1-26.92129-27.482839V0h45.221161l93.448258 87.04 6.606452 6.044903 42.413419 39.63871 9.909678 9.249032z"
        fill={getIconColor(color, 0, '#5E8BFF')}
      />
    </svg>
  );
};

IconWenzhang.defaultProps = {
  size: 16,
};

export default IconWenzhang;
