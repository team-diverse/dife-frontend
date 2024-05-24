import * as React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';

const IconCircleCamera = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Rect width={48} height={48} fill="#2964E0" rx={24} />
    <Path
      stroke="#fff"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m19.815 17.984 1.354-1.624a1 1 0 0 1 .768-.36h4.126a1 1 0 0 1 .768.36l1.354 1.624A2.823 2.823 0 0 0 30.354 19 2.646 2.646 0 0 1 33 21.646V29a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3v-7.354A2.646 2.646 0 0 1 17.646 19c.838 0 1.633-.372 2.169-1.016Z"
    />
    <Circle cx={24} cy={25} r={3} stroke="#fff" strokeWidth={2} />
  </Svg>
)
export default IconCircleCamera;
