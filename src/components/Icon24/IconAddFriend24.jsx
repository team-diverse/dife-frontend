import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { CustomTheme } from "@styles/CustomTheme";

const IconAddFriend24 = ({ active = false, ...props }) => {
	const color = active ? CustomTheme.primaryMedium : "#B0D0FF";
	return (
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
				d="M10.033 14.03c-4.104 0-7.572 2.25-7.572 4.912 0 3.035 4.321 3.386 7.572 3.386 1.873 0 7.572 0 7.572-3.406 0-2.652-3.468-4.892-7.572-4.892ZM10 11.736h.033a5.038 5.038 0 0 0 5.033-5.032 5.037 5.037 0 0 0-5.033-5.032A5.038 5.038 0 0 0 5 6.702a5.023 5.023 0 0 0 5 5.034ZM21.289 9.405h-1.297V8.15a.75.75 0 0 0-1.5 0v1.255h-1.293a.75.75 0 0 0 0 1.5h1.293v1.255a.75.75 0 0 0 1.5 0v-1.255h1.297a.75.75 0 0 0 0-1.5Z"
				clipRule="evenodd"
			/>
		</Svg>
	);
};
export default IconAddFriend24;
