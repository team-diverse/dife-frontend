import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconSettingLanguage = (props) => (
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
			strokeWidth={1.44}
		>
			<Path d="M15.993 18.168c-3.418.234-8.237-4.01-9.096-7.645M3.36 5.813h12.967M9.508 4.2v1.614" />
			<Path d="m11.498 20.313 4.57-8.954 4.572 8.954M13.291 5.813c.11.228-.447 8.296-9.37 11.027" />
		</G>
	</Svg>
);

export default IconSettingLanguage;
