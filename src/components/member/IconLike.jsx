import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconLike = ({ props, color }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            fill={color}
            fillRule="evenodd"
            d="M17.576 2.673c-1.68-.541-3.992.22-5.483 1.838a.147.147 0 0 1-.213.003c-1.558-1.61-3.793-2.385-5.463-1.84-3.916 1.269-5.137 5.838-4.023 9.342 1.758 5.51 7.605 8.484 9.608 8.484 1.787 0 7.866-2.917 9.604-8.484 1.115-3.503-.11-8.072-4.03-9.343Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default IconLike;
