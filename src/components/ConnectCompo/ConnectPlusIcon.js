import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ConnectPlusIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#2964E0"
      fillRule="evenodd"
      d="M8.6 0c.806 0 1.46.654 1.46 1.46v5.672h5.679a1.46 1.46 0 0 1 0 2.921H10.06v5.674a1.46 1.46 0 0 1-2.92 0v-5.674H1.46a1.46 1.46 0 1 1 0-2.92l5.68-.001V1.46C7.14.654 7.792 0 8.6 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default ConnectPlusIcon;
