import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const DifeLine = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={550}
    height={78}
    fill="none"
    {...props}
  >
    <Path
      stroke="#B0D0FF"
      strokeWidth={6}
      d="M3.626 33.311c5.758 28.78 70.545-49.14 138.281-6.084 67.735 43.057 167.66 27.008 182.091-.53 9.883-18.86-18.043-34.975-29.842-11.002-11.8 23.973 9.783 67.347 63.782 57.517 53.999-9.83 61.384-77.812 169.241-67.31 59.272 5.772-37.291 53.429-32.942 70.93"
      opacity={0.4}
    />
  </Svg>
)
export default DifeLine;
