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

export const IconChakan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M531.84512 439.48032a79.58528 79.58528 0 0 0-79.48288 79.48288 79.60576 79.60576 0 0 0 79.48288 79.52384 79.62624 79.62624 0 0 0 79.52384-79.52384 79.60576 79.60576 0 0 0-79.52384-79.48288z"
        fill={getIconColor(color, 0, '#00A0E9')}
      />
      <path
        d="M529.38752 273.05984c-189.21472 0-354.87744 99.328-448.90112 248.36096 94.02368 149.01248 259.6864 248.34048 448.90112 248.34048 189.2352 0 354.89792-99.328 448.9216-248.34048-94.02368-149.03296-259.6864-248.36096-448.9216-248.36096z m2.4576 413.4912c-92.38528 0-167.56736-75.18208-167.56736-167.60832 0-92.38528 75.18208-167.56736 167.56736-167.56736 92.42624 0 167.60832 75.18208 167.60832 167.56736-0.02048 92.44672-75.20256 167.60832-167.60832 167.60832z"
        fill={getIconColor(color, 1, '#00A0E9')}
      />
    </svg>
  );
};

IconChakan.defaultProps = {
  size: 16,
};

export default IconChakan;
