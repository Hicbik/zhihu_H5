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

export const IconCaidan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M163.528 346.867h698.926c36.189 0 65.524-29.338 65.524-65.525 0-36.189-29.335-65.524-65.524-65.524H163.528c-36.189 0-65.525 29.335-65.525 65.524 0 36.188 29.336 65.525 65.525 65.525z m698.926 131.049H163.528c-36.189 0-65.525 29.335-65.525 65.525 0 36.187 29.335 65.524 65.525 65.524h698.926c36.189 0 65.524-29.338 65.524-65.524 0-36.189-29.335-65.525-65.524-65.525z m0 262.098H163.528c-36.189 0-65.525 29.335-65.525 65.524 0 36.187 29.335 65.524 65.525 65.524h698.926c36.189 0 65.524-29.337 65.524-65.524 0-36.188-29.335-65.524-65.524-65.524z"
        fill={getIconColor(color, 0, '#5E9DF3')}
      />
      <path
        d="M163.528 215.818c36.187 0 65.525 29.338 65.525 65.525 0 36.189-29.338 65.525-65.525 65.525-36.189 0-65.524-29.335-65.524-65.525-0.001-36.187 29.335-65.525 65.524-65.525zM163.587 740.014c36.187 0 65.524 29.335 65.524 65.524 0 36.187-29.337 65.525-65.524 65.525-36.189 0-65.524-29.338-65.524-65.525 0-36.188 29.335-65.524 65.524-65.524zM862.454 477.916c36.189 0 65.524 29.337 65.524 65.525 0 36.189-29.335 65.524-65.524 65.524-36.187 0-65.522-29.335-65.522-65.524-0.001-36.187 29.335-65.525 65.522-65.525z"
        fill={getIconColor(color, 1, '#3080EE')}
      />
    </svg>
  );
};

IconCaidan.defaultProps = {
  size: 16,
};

export default IconCaidan;
