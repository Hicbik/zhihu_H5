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

export const IconHao: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1027 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M984.191664 461.608438h-428.184484v-415.402859c0-19.17244-19.17244-44.735692-44.735693-44.735692-25.563253 0-44.735692 25.563253-44.735692 51.126506v415.402858H51.132936c-25.563253-6.390813-51.126506 19.17244-51.126505 44.735693s25.563253 44.735692 44.735692 44.735692h415.402859v415.402858c6.390813 25.563253 25.563253 51.126506 51.126505 51.126506s44.735692-25.563253 44.735693-44.735692v-421.793672h421.793671c25.563253 0 44.735692-25.563253 44.735693-44.735692s-12.781626-51.126506-38.34488-51.126506z"
        fill={getIconColor(color, 0, '#1296db')}
      />
    </svg>
  );
};

IconHao.defaultProps = {
  size: 16,
};

export default IconHao;
