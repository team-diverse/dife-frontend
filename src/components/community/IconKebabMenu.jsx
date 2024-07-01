import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconKebabMenu = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={20}
        fill="none"
        {...props}
    >
        <G
            stroke="#B0D0FF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        >
            <Path d="M7.75 5.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM7.75 11a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM7.75 16.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
        </G>
    </Svg>
);
export default IconKebabMenu;
