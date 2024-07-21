import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconImage = (props) => (
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
			<Path
				d="M21.21 7.899v8.151c0 3.02-1.89 5.15-4.91 5.15H7.65c-3.02 0-4.9-2.13-4.9-5.15V7.899c0-3.02 1.89-5.149 4.9-5.149h8.65c3.02 0 4.91 2.129 4.91 5.149Z"
				clipRule="evenodd"
			/>
			<Path d="m5.281 16.43 1.528-1.613a1.401 1.401 0 0 1 1.98-.06l.937.952a1.434 1.434 0 0 0 2.027.02c.037-.036 2.334-2.822 2.334-2.822a1.687 1.687 0 0 1 2.375-.229c.048.04 2.218 2.267 2.218 2.267" />
			<Path
				d="M10.313 9.133a1.754 1.754 0 1 1-3.508 0 1.754 1.754 0 0 1 3.508 0Z"
				clipRule="evenodd"
			/>
		</G>
	</Svg>
);
export default IconImage;
