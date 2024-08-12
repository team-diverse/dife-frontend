import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconReply = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={19}
		height={25}
		fill="none"
		{...props}
	>
		<Path
			fill="#B0D0FF"
			d="M2 1a1 1 0 0 0-2 0h2Zm17 18L9 13.226v11.547L19 19ZM0 1v14h2V1H0Zm5 19h5v-2H5v2Zm-5-5a5 5 0 0 0 5 5v-2a3 3 0 0 1-3-3H0Z"
		/>
	</Svg>
);
export default IconReply;
