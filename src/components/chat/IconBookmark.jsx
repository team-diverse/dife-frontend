import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconBookmark = ({ color = "#E6F3FF", ...props }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        {...props}
    >
        <Path
            fill={color}
            fillRule="evenodd"
            d="M7.534 28.667c-.493 0-.957-.192-1.306-.541a1.831 1.831 0 0 1-.538-1.304V8.554c0-3.317 2.319-5.22 6.363-5.22h7.89c4.1 0 6.36 1.935 6.36 5.448l.006 18.035c0 .316-.083.629-.239.906a1.83 1.83 0 0 1-1.11.87 1.822 1.822 0 0 1-1.403-.171l-7.524-4.248-7.595 4.257c-.278.155-.59.236-.904.236Zm3.875-15.32h9.079a1 1 0 0 0 0-2h-9.079a1 1 0 0 0 0 2Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default IconBookmark;
