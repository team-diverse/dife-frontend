import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const HeartAc24 = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#FF3E3E"
      fillRule="evenodd"
      d="M17.875 10.299h-.023a.714.714 0 0 1-.69-.736c.031-.904-.41-1.49-1.181-1.57a.713.713 0 1 1 .145-1.417c1.528.156 2.517 1.375 2.461 3.034a.713.713 0 0 1-.712.689Zm-.078-7.045c-1.634-.523-3.897-.306-5.309 1.296-1.483-1.59-3.669-1.822-5.292-1.295-3.72 1.197-4.88 5.507-3.822 8.813 1.67 5.2 7.225 8.005 9.128 8.005 1.698 0 7.473-2.752 9.124-8.005 1.059-3.305-.104-7.615-3.829-8.814Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default HeartAc24;
