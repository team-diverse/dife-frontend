import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ConnectSearchCancel = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <Path fill="#B0D0FF" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Z" />
        <Path
            fill="#E6F3FF"
            fillRule="evenodd"
            d="M10.825 5.172a.5.5 0 0 1 0 .707l-2.12 2.12 2.12 2.122a.5.5 0 0 1-.707.707l-2.122-2.12-2.12 2.12a.5.5 0 1 1-.708-.707l2.121-2.12-2.121-2.122a.5.5 0 1 1 .707-.707l2.121 2.121 2.122-2.121a.5.5 0 0 1 .707 0Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default ConnectSearchCancel;
