import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconSettingSecurity = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={18}
		height={20}
		fill="none"
		{...props}
	>
		<G
			stroke="#2964E0"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		>
			<Path d="M13.423 7.448V5.301A4.552 4.552 0 0 0 8.873.75a4.55 4.55 0 0 0-4.57 4.531v2.167" />
			<Path
				d="M12.683 19.248H5.042a3.792 3.792 0 0 1-3.792-3.792v-4.289a3.792 3.792 0 0 1 3.792-3.792h7.641a3.792 3.792 0 0 1 3.792 3.792v4.289a3.792 3.792 0 0 1-3.792 3.792Z"
				clipRule="evenodd"
			/>
			<Path d="M8.863 12.203v2.221" />
		</G>
	</Svg>
);
export default IconSettingSecurity;
