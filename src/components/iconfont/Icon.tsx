/* tslint:disable */
/* eslint-disable */

import React, { CSSProperties, DOMAttributes, FunctionComponent } from 'react';
import IconChakan from './IconChakan';
import IconZuozhe from './IconZuozhe';
import IconHuifu from './IconHuifu';
import IconMess from './IconMess';
import IconWode from './IconWode';
import IconXie1 from './IconXie1';
import IconWenzhang from './IconWenzhang';
import IconXie from './IconXie';
import IconHao from './IconHao';
import IconNv from './IconNv';
import IconNan from './IconNan';
import IconDianzan11Copy from './IconDianzan11Copy';
import IconPinglun from './IconPinglun';
import IconShangjiantou1 from './IconShangjiantou1';
import IconXiajiantou1 from './IconXiajiantou1';
import IconTuichu from './IconTuichu';
import IconArrowRight from './IconArrowRight';
import IconArrowLift from './IconArrowLift';
import IconArrowUp from './IconArrowUp';
import IconClose from './IconClose';
import IconArrowDown from './IconArrowDown';
import IconCaidan from './IconCaidan';
import IconSousuo from './IconSousuo';
import IconShuaxin from './IconShuaxin';
import IconZhihu from './IconZhihu';

export type IconNames = 'chakan' | 'zuozhe' | 'huifu' | 'mess' | 'wode' | 'xie1' | 'wenzhang' | 'xie' | 'hao' | 'nv' | 'nan' | 'dianzan11-copy' | 'pinglun' | 'shangjiantou1' | 'xiajiantou1' | 'tuichu' | 'arrow-right' | 'arrow-lift' | 'arrow-up' | 'close' | 'arrow-down' | 'caidan' | 'sousuo' | 'shuaxin' | 'zhihu';

interface Props extends DOMAttributes<SVGElement> {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: CSSProperties;
  className?: string;
}

export const Icon: FunctionComponent<Props> = ({ color, name, size, ...rest }) => {
  switch (name) {
    case 'chakan':
      return <IconChakan size={size} color={color} {...rest} />;
    case 'zuozhe':
      return <IconZuozhe size={size} color={color} {...rest} />;
    case 'huifu':
      return <IconHuifu size={size} color={color} {...rest} />;
    case 'mess':
      return <IconMess size={size} color={color} {...rest} />;
    case 'wode':
      return <IconWode size={size} color={color} {...rest} />;
    case 'xie1':
      return <IconXie1 size={size} color={color} {...rest} />;
    case 'wenzhang':
      return <IconWenzhang size={size} color={color} {...rest} />;
    case 'xie':
      return <IconXie size={size} color={color} {...rest} />;
    case 'hao':
      return <IconHao size={size} color={color} {...rest} />;
    case 'nv':
      return <IconNv size={size} color={color} {...rest} />;
    case 'nan':
      return <IconNan size={size} color={color} {...rest} />;
    case 'dianzan11-copy':
      return <IconDianzan11Copy size={size} color={color} {...rest} />;
    case 'pinglun':
      return <IconPinglun size={size} color={color} {...rest} />;
    case 'shangjiantou1':
      return <IconShangjiantou1 size={size} color={color} {...rest} />;
    case 'xiajiantou1':
      return <IconXiajiantou1 size={size} color={color} {...rest} />;
    case 'tuichu':
      return <IconTuichu size={size} color={color} {...rest} />;
    case 'arrow-right':
      return <IconArrowRight size={size} color={color} {...rest} />;
    case 'arrow-lift':
      return <IconArrowLift size={size} color={color} {...rest} />;
    case 'arrow-up':
      return <IconArrowUp size={size} color={color} {...rest} />;
    case 'close':
      return <IconClose size={size} color={color} {...rest} />;
    case 'arrow-down':
      return <IconArrowDown size={size} color={color} {...rest} />;
    case 'caidan':
      return <IconCaidan size={size} color={color} {...rest} />;
    case 'sousuo':
      return <IconSousuo size={size} color={color} {...rest} />;
    case 'shuaxin':
      return <IconShuaxin size={size} color={color} {...rest} />;
    case 'zhihu':
      return <IconZhihu size={size} color={color} {...rest} />;

  }

  return null;
};

Icon.defaultProps = {
  size: 16,
};

export default Icon;
