import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeBg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width='100%'
    height='100%'
    fill="none"
    viewBox="0 -100 375 715"
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M375 277.421V720H0V0c0 104.626 67.5 186 202.154 186 91.555 0 146.837 46.924 172.846 91.421Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default HomeBg;
