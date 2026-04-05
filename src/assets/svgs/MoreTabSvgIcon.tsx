import React from 'react';
import Svg, { Circle } from 'react-native-svg';

const MoreTabSvgIcon = ({
  color,
  focused,
}: {
  color: string;
  focused?: boolean;
}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="5" cy="12" r={focused ? '2.5' : '2'} fill={color} />
    <Circle cx="12" cy="12" r={focused ? '2.5' : '2'} fill={color} />
    <Circle cx="19" cy="12" r={focused ? '2.5' : '2'} fill={color} />
  </Svg>
);

export default MoreTabSvgIcon;
