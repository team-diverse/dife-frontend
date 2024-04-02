import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowRight = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      stroke="#2964E0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.666 6.667S11.333 12.192 11.333 16c0 3.807 9.333 9.333 9.333 9.333"
    />
  </Svg>
)
export default ArrowRight;
