import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChatTabSvgIcon = ({
  color,
  focused,
}: {
  color: string;
  focused?: boolean;
}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 11.5C21 16.1944 16.9706 20 12 20C10.8718 20 9.79155 19.8 8.79093 19.4318C7.54015 19.9882 6.03664 21 4 21C4.42835 19.5447 4.54224 18.0642 4.195 16.7323C2.81232 15.352 2 13.5186 2 11.5C2 6.80558 6.47715 3 12 3C17.5228 3 21 6.80558 21 11.5Z"
      stroke={color}
      strokeWidth={focused ? '2.5' : '2'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ChatTabSvgIcon;
