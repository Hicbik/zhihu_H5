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

export const IconTongzhi: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M 144 752 V 480 a 368.064 368.064 0 0 1 320 -364.928 V 64 a 48 48 0 0 1 96 0 v 51.072 c 180.544 23.552 320 177.92 320 364.928 v 272 H 960 a 48 48 0 1 1 0 96 H 64 a 48 48 0 1 1 0 -96 h 80 Z m 96 0 h 544 V 480 a 272 272 0 1 0 -544 0 v 272 Z m 80 256 a 48 48 0 1 1 0 -96 h 384 a 48 48 0 1 1 0 96 H 320 Z"
        fill={getIconColor(color, 0, '#1296db')}
      />
    </svg>
  );
};

IconTongzhi.defaultProps = {
  size: 16,
};

export default IconTongzhi;
