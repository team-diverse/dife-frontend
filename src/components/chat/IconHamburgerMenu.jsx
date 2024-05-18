import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const IconHamburgerMenu = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G fill="#000" fillRule="evenodd" clipRule="evenodd">
      <Path d="M3.6 18.976a.72.72 0 0 1 .72-.72h15.36a.72.72 0 1 1 0 1.44H4.32a.72.72 0 0 1-.72-.72ZM3.6 5.534a.72.72 0 0 1 .72-.72h15.36a.72.72 0 0 1 0 1.44H4.32a.72.72 0 0 1-.72-.72ZM3.6 12.255a.72.72 0 0 1 .72-.72h15.36a.72.72 0 1 1 0 1.44H4.32a.72.72 0 0 1-.72-.72Z" />
    </G>
  </Svg>
)
export default IconHamburgerMenu;
