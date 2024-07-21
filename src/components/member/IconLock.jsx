import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconLock = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={16}
		height={16}
		fill="none"
		{...props}
	>
		<Path
			fill="#B0D0FF"
			d="M13 7.25h-1.063v-3.5a2 2 0 0 0-2-2H6.063a2 2 0 0 0-2 2v3.5H3a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5Zm-7.813-3.5c0-.483.393-.875.875-.875h3.875c.483 0 .876.392.876.875v3.5H5.186v-3.5Zm7.188 9.375h-8.75v-4.75h8.75v4.75Zm-4.813-2.172v.828c0 .069.057.125.125.125h.625a.125.125 0 0 0 .126-.125v-.828a.75.75 0 1 0-.876 0Z"
		/>
	</Svg>
);
export default IconLock;
