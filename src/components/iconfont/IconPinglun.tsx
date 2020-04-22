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

export const IconPinglun: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M509.2 173.5c-184.3 0-333.8 149.4-333.8 333.8 0 56.5 14.1 109.7 38.9 156.4 9.5 17.1 14.9 36.8 14.9 57.7 0 30.9-11.8 59-31.1 80.3-1.9 4-4.6 10.8-4.6 14.4 0 12.9 9.6 23.3 22.1 24.9h293.6C693.6 841 843 691.6 843 507.2c0-184.3-149.4-333.7-333.8-333.7z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconPinglun.defaultProps = {
  size: 16,
};

export default IconPinglun;
