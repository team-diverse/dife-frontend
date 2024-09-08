import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const IconProgress1 = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={50}
		height={10}
		fill="none"
		{...props}
	>
		<Circle cx={5} cy={5} r={5} fill="#B0D0FF" />
		<Circle cx={26} cy={5} r={4} fill="#E6F3FF" />
		<Circle cx={46} cy={5} r={4} fill="#E6F3FF" />
	</Svg>
);

export default IconProgress1;
