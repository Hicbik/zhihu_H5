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

export const IconXiaoxi21: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M409.6 398.22186667q34.13333333 0 34.13333333 34.13333333v68.26666667q0 34.13333333-34.13333333 34.13333333t-34.13333333-34.13333333v-68.26666667q0-34.13333333 34.13333333-34.13333333zM637.1552 398.22186667q34.13333333 0 34.13333333 34.13333333v68.26666667q0 34.13333333-34.13333333 34.13333333t-34.13333333-34.13333333v-68.26666667q0-34.13333333 34.13333333-34.13333333z"
        fill={getIconColor(color, 0, '#209CDC')}
      />
      <path
        d="M873.17653333 858.7264A498.61973333 498.61973333 0 0 0 1012.62186667 512c0-276.02453333-224.55146667-500.62186667-500.576-500.62186667C235.9296 11.264 11.37813333 235.86133333 11.37813333 512c0 276.02453333 224.55146667 500.62186667 500.576 500.62186667h364.68053334c17.7728 0 33.88373333-10.2848 41.3696-26.28266667a45.62453333 45.62453333 0 0 0-6.144-48.65066667m-103.69706667 1.6832H512C276.36586667 939.34933333 84.65066667 747.63413333 84.65066667 512S276.36586667 84.65066667 512 84.65066667 939.34933333 276.36586667 939.34933333 512a425.30133333 425.30133333 0 0 1-119.03466666 295.936c-34.224 35.49866667-31.42506667 84.5824-12.15146667 131.43573333z"
        fill={getIconColor(color, 1, '#209CDC')}
      />
    </svg>
  );
};

IconXiaoxi21.defaultProps = {
  size: 16,
};

export default IconXiaoxi21;
