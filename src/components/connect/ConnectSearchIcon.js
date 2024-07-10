import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const ConnectSearchIcon = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		{...props}
	>
		<G
			stroke="#B0D0FF"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		>
			<Path d="M11.767 20.755a8.989 8.989 0 1 0 0-17.977 8.989 8.989 0 0 0 0 17.977ZM18.018 18.485 21.542 22" />
		</G>
	</Svg>
);
export default ConnectSearchIcon;
