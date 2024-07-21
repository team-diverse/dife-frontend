import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const IconProfileEdit = ({props, color="#B0D0FF"}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      fill="none"
      {...props}
    >
      <Circle cx={15} cy={15} r={15} fill={color} />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13.335 19.508h6.377"
        transform="translate(3, 2)"
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16.058 4.859a3.042 3.042 0 0 0-4.258.607L5.048 14.46c-1.74 2.318-.094 5.19-.094 5.19s3.244.746 4.958-1.54l6.752-8.994a3.042 3.042 0 0 0-.606-4.258Z"
        clipRule="evenodd"
        transform="translate(3, 2)"
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m10.504 7.21 4.864 3.652"
        transform="translate(3, 2)"
      />
    </Svg>
  )
}

export default IconProfileEdit;
