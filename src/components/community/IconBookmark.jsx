import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { CustomTheme } from "@styles/CustomTheme";

const IconBookmark = (props) => {
	const { active, bookmarkedPostBlue, size = 16, ...restProps } = props;

	const color = bookmarkedPostBlue
		? CustomTheme.primaryMedium
		: active
			? CustomTheme.pointYellow
			: CustomTheme.borderColor;

	return (
		<>
			{size > 16 ? (
				<Svg
					xmlns="http://www.w3.org/2000/svg"
					width={24}
					height={24}
					fill="none"
					{...props}
				>
					<Path
						fill={color}
						fillRule="evenodd"
						d="M15.398 9.968H8.543a.75.75 0 0 1 0-1.5h6.855a.75.75 0 0 1 0 1.5Zm4.542 3.022-.003-2.061C19.937 3.335 18.746 2 11.97 2s-7.966 1.335-7.966 8.929l-.003 2.061c-.01 5.625-.013 7.731.846 8.59.278.279.647.42 1.096.42.955 0 2.017-.907 3.142-1.868.996-.851 2.125-1.815 2.885-1.815.76 0 1.889.964 2.885 1.815C15.98 21.093 17.043 22 17.998 22c.449 0 .818-.141 1.096-.42.859-.859.855-2.965.846-8.59Z"
						clipRule="evenodd"
					/>
				</Svg>
			) : (
				<Svg
					xmlns="http://www.w3.org/2000/svg"
					width={16}
					height={17}
					fill="none"
					{...restProps}
				>
					<Path
						fill={color}
						fillRule="evenodd"
						d="M10.451 7.146h-4.57a.5.5 0 0 1 0-1h4.57a.5.5 0 0 1 0 1Zm3.028 2.015-.002-1.374c0-5.063-.793-5.953-5.31-5.953-4.517 0-5.31.89-5.31 5.953L2.853 9.16c-.006 3.75-.009 5.154.564 5.726.185.186.431.28.73.28.637 0 1.345-.604 2.095-1.245.664-.567 1.417-1.21 1.924-1.21.507 0 1.26.643 1.923 1.21.75.64 1.458 1.245 2.095 1.245.3 0 .545-.094.73-.28.573-.572.57-1.976.565-5.726Z"
						clipRule="evenodd"
					/>
				</Svg>
			)}
		</>
	);
};

export default IconBookmark;
