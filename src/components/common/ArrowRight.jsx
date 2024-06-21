import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowRight = ({ color='#2964E0', size=32, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.666 6.667S11.333 12.192 11.333 16c0 3.807 9.333 9.333 9.333 9.333"
    />
  </Svg>
)
export default ArrowRight;
