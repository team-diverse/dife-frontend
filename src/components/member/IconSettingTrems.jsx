import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconSettingTrems = (props) => (
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
			<Path d="M19.03 13.064c0 5.869-7.03 7.997-7.03 7.997s-7.03-2.127-7.03-7.997-.257-6.328.308-6.893c.565-.565 5.8-2.39 6.722-2.39.922 0 6.156 1.82 6.722 2.39.564.57.309 1.024.309 6.893ZM11.997 8.754v.026m.006 6.549v-3.642" />
		</G>
	</Svg>
);
export default IconSettingTrems;
