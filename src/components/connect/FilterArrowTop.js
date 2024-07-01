import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FilterArrowTop = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke="#4E4F56"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.998 15.5s4.144-7 7-7c2.855 0 7 7 7 7"
        />
    </Svg>
);
export default FilterArrowTop;
