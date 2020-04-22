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

export const IconDianzan11Copy: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M936.25086007 410.90035829h-270.68309662c104.8875397-387.37266444-72.26699795-407.15740085-72.26699796-407.15740085-75.08396235 0-59.51917367 59.3730623-65.19709297 69.27250043 0 189.44203259-201.21578105 337.88647153-201.21578104 337.88647154v537.22794218c0 53.03057197 72.26699795 72.12874205 100.61574597 72.12874204h406.70178476c38.27646574 0 69.44532032-100.38008249 69.4453203-100.38008246 100.61731707-342.13626998 100.61731707-443.93347565 100.61731707-443.93347564 0.00157109-70.68805251-68.0171995-65.03998395-68.01719951-65.03998397v0 0zM936.25086007 410.90035829z"
        fill={getIconColor(color, 0, '#1296db')}
      />
      <path
        d="M215.80554389 411.07789147h-162.08464235c-33.47364362 0-33.99053221 32.87820048-33.99053221 32.87820051l33.4736436 541.81238281c0 34.48542556 34.5435559 34.48542556 34.5435559 34.48542556h140.28419748c29.22541623 0 28.96618638-22.81222685 28.96618638-22.81222684v-545.27663628c0-41.61188982-41.19555097-41.08557468-41.19555097-41.08557467v0 0zM215.80554389 411.07789147z"
        fill={getIconColor(color, 1, '#1296db')}
      />
    </svg>
  );
};

IconDianzan11Copy.defaultProps = {
  size: 16,
};

export default IconDianzan11Copy;
