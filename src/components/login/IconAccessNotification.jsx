import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconAccessNotification = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<G
			stroke="#2964E0"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.846}
		>
			<Path
				d="M7.518 13.376a7.869 7.869 0 0 1 15.735 0l.002 1.58c0 .935.207 1.857.604 2.702l.558 1.187c.854 1.815-.47 3.9-2.474 3.9H8.83c-2.005 0-3.33-2.085-2.475-3.9l.559-1.187a6.348 6.348 0 0 0 .603-2.702l.002-1.58Z"
				clipRule="evenodd"
			/>
			<Path
				d="M11.668 23.363a3.714 3.714 0 0 0 7.428 0M5.623 8.34a9.331 9.331 0 0 1 2.73-3.417M25.148 8.34a9.33 9.33 0 0 0-2.73-3.417"
				opacity={0.4}
			/>
		</G>
	</Svg>
);
export default IconAccessNotification;
