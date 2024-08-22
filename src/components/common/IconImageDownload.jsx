import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconImageDownload = (props) => (
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
			<Path d="M12.122 15.435V3.396M15.038 12.508l-2.916 2.928-2.916-2.928" />
			<Path d="M16.755 8.127h.933a3.684 3.684 0 0 1 3.684 3.685v4.884a3.675 3.675 0 0 1-3.675 3.675H6.557a3.685 3.685 0 0 1-3.685-3.685v-4.885a3.675 3.675 0 0 1 3.675-3.674h.942" />
		</G>
	</Svg>
);
export default IconImageDownload;
