import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const IconCircleNumber = (props) => {
	const { color = "#D9EAFF", ...restProps } = props;

	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={16}
			height={16}
			fill="none"
			{...restProps}
		>
			<Circle cx={8} cy={8} r={8} fill={color} />
		</Svg>
	);
};

export default IconCircleNumber;
