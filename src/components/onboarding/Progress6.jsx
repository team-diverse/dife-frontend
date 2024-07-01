import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const Progress6 = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={110}
        height={10}
        fill="none"
        {...props}
    >
        <Circle cx={105} cy={5} r={5} fill="#B0D0FF" />
        <Circle cx={4} cy={5} r={4} fill="#E6F3FF" />
        <Circle cx={24} cy={5} r={4} fill="#E6F3FF" />
        <Circle cx={44} cy={5} r={4} fill="#E6F3FF" />
        <Circle cx={64} cy={5} r={4} fill="#E6F3FF" />
        <Circle cx={84} cy={5} r={4} fill="#E6F3FF" />
    </Svg>
);
export default Progress6;
