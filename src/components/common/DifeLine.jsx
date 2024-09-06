import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DifeLine = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={593}
		height={159}
		fill="none"
		{...props}
	>
		<Path
			stroke="#E6F3FF"
			strokeWidth={16}
			d="M4.989 140.763c151.151-94.708 164.761-21.072 271.055 4.193 106.294 25.265 148.204-48.79 122.851-106.33-25.352-57.541-94.275-24.094-72.361 26.21 21.915 50.305 103.448 43.032 139.448 7.032C501.982 35.868 592 41 592 41"
		/>
	</Svg>
);
export default DifeLine;
