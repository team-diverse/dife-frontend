import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { CustomTheme } from "@styles/CustomTheme";

const IconHeart24 = ({ active = false, ...props }) => {
	const color = active ? CustomTheme.warningRed : "#B0D0FF";
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
				d="M17.907 10.698h-.025a.751.751 0 0 1-.725-.775c.032-.951-.433-1.568-1.244-1.651a.75.75 0 1 1 .153-1.492c1.608.164 2.649 1.447 2.59 3.193a.75.75 0 0 1-.75.725Zm-.082-7.414c-1.72-.55-4.101-.322-5.587 1.364-1.561-1.674-3.861-1.917-5.57-1.363-3.914 1.26-5.135 5.796-4.021 9.275 1.758 5.471 7.603 8.423 9.605 8.423 1.787 0 7.864-2.896 9.602-8.423 1.114-3.478-.11-8.014-4.03-9.276Z"
				clipRule="evenodd"
			/>
		</Svg>
	);
};
export default IconHeart24;
