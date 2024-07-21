import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { CustomTheme } from "@styles/CustomTheme";

const IconHeart = ({ props, active }) => {
	const color = active ? CustomTheme.warningRed : CustomTheme.borderColor;
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={16}
			height={16}
			fill="none"
			{...props}
		>
			<Path
				fill={color}
				fillRule="evenodd"
				d="M11.343 2.045c-1.087-.36-2.581.142-3.551 1.211a.113.113 0 0 1-.165.002C6.615 2.195 5.17 1.684 4.09 2.046 1.544 2.892.75 5.938 1.475 8.274c1.143 3.673 4.943 5.656 6.245 5.656 1.162 0 5.113-1.945 6.243-5.656.724-2.336-.071-5.382-2.62-6.23Z"
				clipRule="evenodd"
			/>
		</Svg>
	);
};
export default IconHeart;
