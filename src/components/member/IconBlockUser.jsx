import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconBlockUser = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={13}
		height={16}
		fill="none"
		{...props}
	>
		<G fill="#2964E0" fillRule="evenodd" clipRule="evenodd">
			<Path d="M6.205 9.336c-2.642 0-4.873 1.443-4.873 3.152 0 1.96 2.78 2.186 4.873 2.186 1.205 0 4.872 0 4.872-2.2 0-1.7-2.231-3.138-4.872-3.138ZM6.554 7.85h.02a3.246 3.246 0 0 0 3.243-3.243 3.247 3.247 0 0 0-3.243-3.244 3.246 3.246 0 0 0-3.242 3.242c-.003.864.33 1.676.938 2.289.609.613 1.42.952 2.284.955Z" />
		</G>
	</Svg>
);
export default IconBlockUser;
