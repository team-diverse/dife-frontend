import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconModifyProfileCheck = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		{...props}
	>
		<Path
			fill="#2964E0"
			d="m8.174 17.122-4.142-4.14a1.19 1.19 0 0 0-1.683 1.683l4.99 4.986a1.19 1.19 0 0 0 1.683 0l12.63-12.62a1.189 1.189 0 1 0-1.684-1.683L8.174 17.122Z"
		/>
	</Svg>
);
export default IconModifyProfileCheck;
