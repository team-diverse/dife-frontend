import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconAccessCamera = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
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
            <Path
                d="M18.053 1.401c1.347.536 1.76 2.403 2.31 3.003.55.6 1.338.804 1.774.804a4.196 4.196 0 0 1 4.196 4.194v7.727a5.628 5.628 0 0 1-5.626 5.627H7.293a5.627 5.627 0 0 1-5.626-5.627V9.402a4.196 4.196 0 0 1 4.196-4.194c.434 0 1.222-.204 1.774-.804.551-.6.962-2.467 2.308-3.003 1.348-.536 6.762-.536 8.108 0Z"
                clipRule="evenodd"
            />
            <G opacity={0.4}>
                <Path d="M21.327 8.933h.012" />
                <Path
                    d="M18.238 13.77a4.238 4.238 0 1 0-8.476 0 4.238 4.238 0 0 0 8.476 0Z"
                    clipRule="evenodd"
                />
            </G>
        </G>
    </Svg>
);
export default IconAccessCamera;
