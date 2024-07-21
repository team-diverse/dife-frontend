import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconSearchFail = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={37}
    height={36}
    fill="none"
    {...props}
  >
    <G fill="#4E4F56" fillRule="evenodd" clipRule="evenodd">
      <Path d="M17.463 6.577C11.153 6.577 6.04 11.69 6.04 18c0 6.308 5.114 11.423 11.423 11.423 6.31 0 11.423-5.115 11.423-11.423 0-6.31-5.114-11.423-11.423-11.423ZM3.963 18c0-7.456 6.044-13.5 13.5-13.5s13.5 6.044 13.5 13.5c0 7.455-6.044 13.5-13.5 13.5-7.457 0-13.5-6.045-13.5-13.5Z" />
      <Path d="M17.456 11.848c.573 0 1.038.465 1.038 1.038v5.953a1.038 1.038 0 1 1-2.077 0v-5.953c0-.573.465-1.038 1.038-1.038Zm.005 10.228c.573 0 1.038.465 1.038 1.039v.066a1.038 1.038 0 0 1-2.077 0v-.066c0-.574.465-1.039 1.039-1.039Z" />
    </G>
  </Svg>
);
export default IconSearchFail;
