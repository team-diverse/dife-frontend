import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const IconCircleNumber = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={16}
		height={16}
		fill="none"
		{...props}
	>
		<Circle cx={8} cy={8} r={8} fill="#D9EAFF" />
	</Svg>
);
export default IconCircleNumber;
