import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const DifeLine = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={58}
    height={465}
    fill="none"
    {...props}
  >
    <Path
      stroke="#B0D0FF"
      strokeWidth={4}
      d="M31.395 0c0 37 16.605 44 22.57 36.172 8.167-10.719-19.007-24.918-28.906-3.215-9.9 21.703-.793 48.229 2.771 57.473 3.565 9.244 33.262 49.435 6.336 89.626-26.926 40.191-2.872 45.771 10.295 70.334 14.651 27.33-13.286 40.975-33.261 78.774-23.363 44.21 2.77 130.219 22.965 133.836"
    />
  </Svg>
)
export default DifeLine;
