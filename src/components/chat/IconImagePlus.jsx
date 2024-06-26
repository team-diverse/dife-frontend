import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconImagePlus = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path fill="#fff" d="M0 0h24v24H0z" />
        <Path
            stroke="#121212"
            strokeLinecap="round"
            strokeWidth={2}
            d="M12 5v14M19 12H5"
        />
    </Svg>
);
export default IconImagePlus;
