import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface PlusBadgeProps {
  fillColor: string;
  plusColor: string;
}

const PlusBadgeSvgIcon = ({ fillColor, plusColor }: PlusBadgeProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="12" fill={fillColor} />
    <Path
      d="M12 7V17M7 12H17"
      stroke={plusColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PlusBadgeSvgIcon;
