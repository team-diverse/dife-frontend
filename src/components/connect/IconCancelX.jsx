import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconCancelX = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill="#CDCFD5"
      d="M26.061 23.939a1.503 1.503 0 0 1-2.125 2.125L16 18.125 8.06 26.061a1.503 1.503 0 1 1-2.125-2.125L13.875 16 5.939 8.061a1.503 1.503 0 1 1 2.125-2.125L16 13.876l7.939-7.94a1.503 1.503 0 0 1 2.125 2.124L18.124 16l7.937 7.939Z"
    />
  </Svg>
)
export default IconCancelX;
