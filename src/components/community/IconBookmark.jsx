import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconBookmark = ({ active, ...props }) => {
	const color = active ? CustomTheme.pointYellow : CustomTheme.borderColor;
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={16}
			height={17}
			fill="none"
			{...props}
		>
			<Path
				fill={color}
				fillRule="evenodd"
				d="M10.451 7.146h-4.57a.5.5 0 0 1 0-1h4.57a.5.5 0 0 1 0 1Zm3.028 2.015-.002-1.374c0-5.063-.793-5.953-5.31-5.953-4.517 0-5.31.89-5.31 5.953L2.853 9.16c-.006 3.75-.009 5.154.564 5.726.185.186.431.28.73.28.637 0 1.345-.604 2.095-1.245.664-.567 1.417-1.21 1.924-1.21.507 0 1.26.643 1.923 1.21.75.64 1.458 1.245 2.095 1.245.3 0 .545-.094.73-.28.573-.572.57-1.976.565-5.726Z"
				clipRule="evenodd"
			/>
		</Svg>
	);
};

export default IconBookmark;
