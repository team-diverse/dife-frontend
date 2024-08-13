import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconSettingSeviceNews = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		{...props}
	>
		<G
			stroke="#2964E0"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		>
			<Path d="M16.218 21H7.783C4.835 21 3 18.919 3 15.974V8.026C3 5.081 4.835 3 7.784 3h8.434C19.166 3 21 5.081 21 8.026v7.948C21 18.919 19.157 21 16.218 21ZM12.006 8.105v3.892m0 3.694v.048" />
		</G>
	</Svg>
);
export default IconSettingSeviceNews;
