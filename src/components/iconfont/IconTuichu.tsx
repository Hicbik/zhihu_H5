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

export const IconTuichu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M736.64 183.168c-19.52-10.944-44.672-4.544-56.064 14.336-11.392 18.88-4.736 43.072 14.848 54.016 112.576 62.976 182.464 179.84 182.464 304.96 0 194.368-164.16 352.448-365.888 352.448-201.792 0-365.952-158.144-365.952-352.448 0-125.12 69.952-241.984 182.464-304.96 19.584-10.944 26.24-35.136 14.848-54.016C332.032 178.624 306.944 172.224 287.36 183.168 149.568 260.224 64 403.264 64 556.48c0 237.952 200.96 431.552 448 431.552 247.04 0 448-193.6 448-431.552C960 403.264 874.432 260.224 736.64 183.168zM512 731.072c22.656 0 41.024-17.728 41.024-39.552L553.024 75.52c0-21.824-18.368-39.552-41.024-39.552-22.656 0-41.024 17.728-41.024 39.552l0 616C470.976 713.344 489.344 731.072 512 731.072z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconTuichu.defaultProps = {
  size: 16,
};

export default IconTuichu;
