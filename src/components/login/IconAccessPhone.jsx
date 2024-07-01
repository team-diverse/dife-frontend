import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconAccessPhone = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        {...props}
    >
        <G
            stroke="#2964E0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
        >
            <Path d="m8.607 18.425.001 4.752A4.823 4.823 0 0 0 13.431 28h7.355a4.824 4.824 0 0 0 4.823-4.825l-.001-14.352A4.824 4.824 0 0 0 20.784 4h-2.553" />
            <Path
                d="m12.885 11.194 1.944 1.94m-4.574-8.637a3.865 3.865 0 1 1 0 7.73 3.865 3.865 0 0 1 0-7.73Z"
                opacity={0.4}
            />
            <Path d="M17.107 23.108v-.064m0-.338a.333.333 0 1 0 0 .667.333.333 0 0 0 0-.667Z" />
        </G>
    </Svg>
);
export default IconAccessPhone;
