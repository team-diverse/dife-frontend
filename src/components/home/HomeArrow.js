import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HomeArrow = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={68}
		height={68}
		fill="none"
		{...props}
	>
		<Path
			stroke="#2964E0"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={4.188}
			d="M24.084 14.167S43.917 25.908 43.917 34c0 8.09-19.833 19.834-19.833 19.834"
		/>
	</Svg>
);
export default HomeArrow;
