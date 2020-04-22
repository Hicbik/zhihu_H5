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

export const IconXie: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M326.062 550.064l-20.296 73.607a48.094 48.094 0 0 0 54.723 60.144l95.819-16.916a48.095 48.095 0 0 0 25.689-13.397l409.16-410.207c11.839-11.831 18.358-27.567 18.358-44.308 0-16.734-6.515-32.465-18.344-44.297l-44.461-44.461c-11.868-11.848-27.595-18.357-44.312-18.357h-0.002c-16.737 0.001-32.477 6.524-44.32 18.367l-419.614 418.56a48.077 48.077 0 0 0-12.4 21.265z m46.362 12.784l419.657-418.603a14.543 14.543 0 0 1 10.315-4.281 14.54 14.54 0 0 1 10.306 4.271l44.458 44.458c5.682 5.683 5.682 14.906 0 20.585L447.947 619.539l-95.819 16.916 20.296-73.607z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M935.212 362.817c-13.281 0-24.046 10.766-24.046 24.046v380.344c0 16.809-13.675 30.484-30.484 30.484H602.178a24.05 24.05 0 0 0-16.63 6.677l-74.173 71.022-80.805-71.645a24.046 24.046 0 0 0-15.953-6.054H143.318c-16.809 0-30.484-13.675-30.484-30.484V194.494c0-16.809 13.675-30.484 30.484-30.484h345.843c13.281 0 24.046-10.766 24.046-24.046 0-13.281-10.766-24.046-24.046-24.046H143.318c-43.327 0-78.576 35.249-78.576 78.576v572.713c0 43.326 35.249 78.576 78.576 78.576h262.173l90.556 80.292a23.979 23.979 0 0 0 15.951 6.054c6 0 11.993-2.234 16.633-6.678l83.203-79.667h268.848c43.328 0 78.576-35.25 78.576-78.576V386.863c0-13.281-10.766-24.046-24.046-24.046z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IconXie.defaultProps = {
  size: 16,
};

export default IconXie;
