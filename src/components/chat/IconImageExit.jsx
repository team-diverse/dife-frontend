import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconImageExit = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <G stroke="#121212" strokeLinecap="round" strokeWidth={2}>
            <Path d="M18 6 6 18M6 6l12 12" />
        </G>
    </Svg>
);
export default IconImageExit;
