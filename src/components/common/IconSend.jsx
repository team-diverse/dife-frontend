import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const IconSend = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G fill="#2964E0">
      <Path d="M21.427 2.578c-.5-.51-1.24-.7-1.93-.5l-16.09 4.65a1.914 1.914 0 0 0-1.383 1.51c-.142.746.354 1.694 1.002 2.09L8.057 13.4a1.308 1.308 0 0 0 1.61-.19l5.76-5.762a.735.735 0 0 1 1.06 0c.29.29.29.76 0 1.06l-5.77 5.761a1.31 1.31 0 0 0-.194 1.61l3.074 5.05c.36.598.98.94 1.66.94.08 0 .17 0 .25-.012.78-.099 1.4-.63 1.63-1.38l4.77-15.969c.21-.68.02-1.42-.48-1.93Z" />
      <Path
        d="M9.452 19.14a.752.752 0 0 1 0 1.062l-1.366 1.365a.744.744 0 0 1-.53.22.749.749 0 0 1-.53-1.28l1.365-1.366a.752.752 0 0 1 1.061 0Zm-.783-3.787a.752.752 0 0 1 0 1.06L7.303 17.78a.744.744 0 0 1-.53.22.749.749 0 0 1-.53-1.28l1.365-1.366a.752.752 0 0 1 1.06 0ZM4.907 14.16a.752.752 0 0 1 0 1.061l-1.366 1.365a.744.744 0 0 1-.53.22.749.749 0 0 1-.53-1.28l1.365-1.366a.752.752 0 0 1 1.061 0Z"
        opacity={0.4}
      />
    </G>
  </Svg>
    )
};
export default IconSend;
