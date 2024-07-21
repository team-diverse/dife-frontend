import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const IconChatOut = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		{...props}
	>
		<G stroke="#8C8D91" strokeLinecap="round" strokeWidth={1.5}>
			<Path d="M10.118 11.123v1.753" />
			<Path
				strokeLinejoin="round"
				d="M13.178 18.584V5.416a2.666 2.666 0 0 0-3.21-2.61L4.747 3.892A2.665 2.665 0 0 0 2.622 6.5v11c0 1.263.887 2.352 2.124 2.61l5.223 1.083a2.666 2.666 0 0 0 3.209-2.609ZM13.317 19.125h2.852a2.452 2.452 0 0 0 2.453-2.451M21.378 12H15.51m5.868 0-2.009-2m2.009 2-2.009 2M13.317 4.875h2.852a2.452 2.452 0 0 1 2.453 2.452"
			/>
		</G>
	</Svg>
);
export default IconChatOut;
