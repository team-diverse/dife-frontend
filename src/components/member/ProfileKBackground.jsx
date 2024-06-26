import * as React from "react";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const ProfileKBackground = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={116}
        height={116}
        fill="none"
        {...props}
    >
        <Circle cx={58} cy={58} r={58} fill="url(#a)" />
        <Defs>
            <LinearGradient
                id="a"
                x1={108}
                x2={3}
                y1={116}
                y2={-44}
                gradientUnits="userSpaceOnUse"
            >
                <Stop offset={0.046} stopColor="#D9EAFF" />
                <Stop offset={1} stopColor="#fff" />
            </LinearGradient>
        </Defs>
    </Svg>
);
export default ProfileKBackground;
