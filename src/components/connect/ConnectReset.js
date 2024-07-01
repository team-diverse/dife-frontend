import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const ConnectReset = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <G
            stroke="#2964E0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
        >
            <Path d="M19.932 13.04a8 8 0 1 1-9.925-8.787c3.9-1 7.935 1.007 9.425 4.747" />
            <Path d="M20 4v5h-5" />
        </G>
    </Svg>
);
export default ConnectReset;
