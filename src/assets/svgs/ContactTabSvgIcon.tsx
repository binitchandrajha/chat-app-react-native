import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ContactTabSvgIcon = ({
  color,
  focused,
}: {
  color: string;
  focused?: boolean;
}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 11.6569 13.6569 13 12 13Z"
      stroke={color}
      strokeWidth={focused ? '2.5' : '2'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ContactTabSvgIcon;
