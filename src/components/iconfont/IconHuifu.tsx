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

export const IconHuifu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M958.4 808.5S926.1 393 408.5 396.6V191L63.4 500.8l345 309.8V606.5c0.1 0 327.1-53.9 550 202"
        fill={getIconColor(color, 0, '#45c4dc')}
      />
    </svg>
  );
};

IconHuifu.defaultProps = {
  size: 16,
};

export default IconHuifu;
