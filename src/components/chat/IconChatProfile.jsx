import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconChatProfile = ({ size = 48, ...props }) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		fill="none"
		viewBox="0 0 48 48"
		{...props}
	>
		<Path
			fill="#D9EAFF"
			d="M0 10C0 4.477 4.477 0 10 0h14c13.255 0 24 10.745 24 24S37.255 48 24 48H10C4.477 48 0 43.523 0 38V10Z"
		/>
	</Svg>
);
export default IconChatProfile;
