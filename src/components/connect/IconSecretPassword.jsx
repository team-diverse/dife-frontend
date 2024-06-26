import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconSecretPassword = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#393A3F"
      d="M6.77 2.813c0-.45.366-.813.82-.813h.82c.454 0 .82.363.82.813V6.39l3.13-1.787a.825.825 0 0 1 1.12.297l.41.703a.808.808 0 0 1-.3 1.11L10.462 8.5l3.128 1.787a.809.809 0 0 1 .3 1.11l-.41.703a.823.823 0 0 1-1.12.298L9.23 10.61v3.578c0 .449-.366.812-.82.812h-.82a.816.816 0 0 1-.82-.813V10.61L3.64 12.4a.825.825 0 0 1-1.12-.297l-.41-.703a.808.808 0 0 1 .3-1.11L5.538 8.5 2.41 6.713a.808.808 0 0 1-.3-1.11l.41-.703a.824.824 0 0 1 1.12-.3l3.13 1.788V2.813Z"
    />
  </Svg>
)
export default IconSecretPassword;
