import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconDelete = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path fill="#8C8D91" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Z" />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M10.825 5.172a.5.5 0 0 1 0 .707l-2.12 2.12 2.12 2.123a.5.5 0 0 1-.707.707L7.997 8.707 5.876 10.83a.5.5 0 0 1-.708-.707L7.29 8 5.168 5.88a.5.5 0 0 1 .708-.707l2.12 2.121 2.122-2.121a.5.5 0 0 1 .707 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default IconDelete;
