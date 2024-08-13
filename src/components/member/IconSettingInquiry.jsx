import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconSettingInquiry = (props) => (
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
			<Path d="M11.977 20.9a8.609 8.609 0 0 0 6.644-3.09c2.612-3.098 2.694-7.748.186-10.931a8.628 8.628 0 0 0-12.91-.78c-2.642 2.65-3.212 6.575-1.732 9.785.123.308.6 1.155.92 1.712a.933.933 0 0 1-.046 1.005c-.211.298-.478.68-.687.992a.839.839 0 0 0 .694 1.308h.52c2.28-.001 5.617-.003 6.41 0ZM11.784 15.938v.006" />
			<Path d="M11.783 13.78c-.01-.787.704-1.122 1.236-1.426.647-.358 1.087-.929 1.087-1.72a2.109 2.109 0 0 0-2.107-2.114 2.103 2.103 0 0 0-2.106 2.114" />
		</G>
	</Svg>
);
export default IconSettingInquiry;
