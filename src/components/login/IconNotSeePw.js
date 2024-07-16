import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconNotSeePw = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		{...props}
	>
		<Path
			fill="#AFB0B3"
			d="M3.05 9.31a1 1 0 1 1 1.914-.577c2.086 6.986 11.982 6.987 14.07.004a1 1 0 1 1 1.918.57 9.507 9.507 0 0 1-1.813 3.417L20.414 14A1 1 0 0 1 19 15.414l-1.311-1.311a9.116 9.116 0 0 1-2.32 1.269l.357 1.335a1 1 0 1 1-1.931.518l-.364-1.357c-.947.14-1.915.14-2.862 0l-.364 1.357a1 1 0 1 1-1.931-.518l.357-1.335a9.118 9.118 0 0 1-2.32-1.27L5 15.414A1 1 0 1 1 3.585 14l1.275-1.275c-.784-.936-1.41-2.074-1.812-3.414l.002-.001Z"
		/>
	</Svg>
);
export default IconNotSeePw;
