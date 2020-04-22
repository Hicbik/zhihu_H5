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

export const IconShuaxin: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M626.688 955.904c-37.376 9.728-75.776 14.336-114.688 14.336-252.416 0-458.24-205.312-458.24-458.24 0-140.8 65.536-273.92 175.616-360.96l-0.512 129.536c0 14.848 11.776 27.136 26.624 27.136 14.848 0 27.136-11.776 27.136-26.624l0.512-152.576c0-28.16-22.528-51.2-50.688-51.2L80.384 76.8c-14.848 0-27.136 11.776-27.136 26.624 0 14.848 11.776 27.136 26.624 27.136l89.6 0.512C62.464 227.328 0 366.08 0 512c0 282.112 229.888 512 512 512 43.52 0 86.528-5.632 128-15.872 14.336-3.584 23.04-18.432 19.456-32.768-4.096-14.848-18.432-23.04-32.768-19.456zM916.992 932.352l-96.256-11.776c128-96.256 203.264-245.76 203.264-408.576C1024 229.888 794.112 0 512 0 448 0 386.048 11.776 327.168 34.304c-13.824 5.632-20.992 20.992-15.36 34.816 5.632 13.824 20.992 20.48 34.816 15.36 52.736-20.48 108.544-30.72 165.376-30.72 252.416 0 458.24 205.312 458.24 458.24 0 152.576-73.728 291.84-198.144 377.344l14.848-123.392c1.536-14.848-8.704-28.16-23.552-30.208-14.848-2.048-28.16 8.704-30.208 23.552l-17.92 151.552c-1.536 13.312 2.048 26.624 10.752 37.376 8.192 10.752 20.48 17.408 33.792 18.944l151.552 17.92h3.072c13.312 0 25.088-10.24 26.624-23.552 1.536-14.336-9.216-27.648-24.064-29.184z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconShuaxin.defaultProps = {
  size: 16,
};

export default IconShuaxin;
