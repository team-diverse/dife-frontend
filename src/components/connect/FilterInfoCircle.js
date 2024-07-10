import * as React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";

const FilterInfoCircle = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={16}
		height={16}
		fill="none"
		{...props}
	>
		<Circle cx={8} cy={8} r={5.5} stroke="#8C8D91" />
		<G stroke="#8C8D91" strokeLinecap="round" strokeLinejoin="round">
			<Path d="M7.996 10.667V8" />
			<Path strokeWidth={1.333} d="M7.993 5.47H8" />
		</G>
	</Svg>
);
export default FilterInfoCircle;
