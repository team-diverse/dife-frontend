import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconSettingProfile = (props) => (
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
			strokeWidth={1.385}
		>
			<Path d="M19.524 12a8.307 8.307 0 0 0-8.308-8.309A8.308 8.308 0 1 0 19.524 12Z" />
			<Path d="M6.463 18.808c.189-1.464 1.491-3.09 4.724-3.09 3.27 0 4.563 1.635 4.743 3.117" />
			<Path
				d="M14.232 10.456a3.042 3.042 0 1 1-6.085 0 3.042 3.042 0 0 1 6.085 0Z"
				clipRule="evenodd"
			/>
		</G>
	</Svg>
);
export default IconSettingProfile;
