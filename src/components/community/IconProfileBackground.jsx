import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const IconProfileBackground = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={36}
		height={36}
		fill="none"
		{...props}
	>
		<Circle cx={18} cy={18} r={18} fill="#B0D0FF" />
	</Svg>
);
export default IconProfileBackground;
