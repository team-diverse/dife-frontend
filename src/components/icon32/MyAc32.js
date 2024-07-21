import * as React from "react";
import Svg, { Path } from "react-native-svg";

const MyAc32 = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<Path
			fill="#2964E0"
			fillRule="evenodd"
			d="M16.334 18.44c-5.218 0-9.794 3.07-9.794 6.567 0 4.5 7.372 4.5 9.794 4.5 2.421 0 9.792 0 9.792-4.529 0-3.483-4.576-6.537-9.792-6.537ZM16.283 15.523h.042a6.523 6.523 0 0 0 6.516-6.516 6.523 6.523 0 0 0-6.516-6.515c-3.594 0-6.516 2.923-6.516 6.512a6.504 6.504 0 0 0 6.474 6.519Z"
			clipRule="evenodd"
		/>
	</Svg>
);
export default MyAc32;
