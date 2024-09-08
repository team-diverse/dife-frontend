import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const IconProgress2 = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={50}
		height={10}
		fill="none"
		{...props}
	>
		<Circle cx={4} cy={5} r={4} fill="#E6F3FF" />
		<Circle cx={25} cy={5} r={5} fill="#B0D0FF" />
		<Circle cx={46} cy={5} r={4} fill="#E6F3FF" />
	</Svg>
);

export default IconProgress2;
