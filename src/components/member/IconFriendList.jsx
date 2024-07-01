import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const IconFriendList = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={36}
        height={36}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                fill="#2964E0"
                fillRule="evenodd"
                d="M18.375 20.746c-5.87 0-11.017 3.453-11.017 7.388 0 5.062 8.293 5.062 11.017 5.062s11.016 0 11.016-5.095c0-3.918-5.148-7.355-11.016-7.355Z"
                clipRule="evenodd"
            />
            <Path
                stroke="#B0D0FF"
                strokeLinecap="round"
                strokeWidth={1.8}
                d="M7.864 19.651c2.675 5.81 13.586 7.475 18.117 2.647 3.13-3.337.222-7.555-2.909-4.219-4.427 4.718 2.134 11.46 7.62 8.158 1.45-.872 2.82-1.213 4.314.63"
            />
            <Path
                fill="#2964E0"
                fillRule="evenodd"
                d="M18.319 17.464h.046c4.043 0 7.33-3.288 7.33-7.33 0-4.041-3.287-7.33-7.33-7.33-4.042 0-7.33 3.289-7.33 7.327-.014 4.029 3.252 7.318 7.284 7.333Z"
                clipRule="evenodd"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h36v36H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default IconFriendList;
