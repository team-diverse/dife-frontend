import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FilterNotCheckIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <Path
            stroke="#AFB0B3"
            strokeLinejoin="round"
            d="M12.5 2h-9A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12.5 2Z"
        />
    </Svg>
);
export default FilterNotCheckIcon;
