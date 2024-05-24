import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const DashedLine = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={632}
    height={2}
    fill="none"
    {...props}
  >
    <Path stroke="#B0D0FF" strokeDasharray="2 2" d="M0 1h632" />
  </Svg>
)
export default DashedLine;
