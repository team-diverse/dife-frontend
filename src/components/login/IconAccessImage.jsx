import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconAccessImage = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<G
			stroke="#2964E0"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.846}
		>
			<Path
				d="M26.462 11.108v9.782c0 3.624-2.269 6.18-5.893 6.18H10.188c-3.624 0-5.88-2.556-5.88-6.18v-9.782c0-3.624 2.268-6.18 5.88-6.18h10.381c3.624 0 5.893 2.556 5.893 6.18Z"
				clipRule="evenodd"
			/>
			<Path
				d="m7.346 21.345 1.834-1.936a1.68 1.68 0 0 1 2.374-.074l.003.001 1.123 1.143c.666.678 1.755.69 2.434.024.044-.043 2.8-3.387 2.8-3.387a2.025 2.025 0 0 1 2.85-.274c.058.048 2.662 2.72 2.662 2.72"
				opacity={0.4}
			/>
			<Path
				d="M13.385 12.59a2.105 2.105 0 1 1-4.21 0 2.105 2.105 0 0 1 4.21 0Z"
				clipRule="evenodd"
				opacity={0.4}
			/>
		</G>
	</Svg>
);
export default IconAccessImage;
