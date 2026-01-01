import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconChevronDown = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={11}
		height={7}
		fill="none"
		{...props}
	>
		<Path stroke="#4E4F56" d="m.354.354 5 5 5-5" />
	</Svg>
);
export default IconChevronDown;
