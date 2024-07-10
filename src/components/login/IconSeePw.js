import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconSeePw = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		{...props}
	>
		<Path
			stroke="#393A3F"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.44}
			d="M11.998 19.269c3.557 0 6.81-2.558 8.642-6.82-1.832-4.26-5.085-6.818-8.642-6.818-3.553 0-6.806 2.557-8.638 6.819 1.832 4.263 5.085 6.819 8.642 6.819h-.004Z"
		/>
		<Path
			stroke="#393A3F"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.44}
			d="M14.956 12.455a2.954 2.954 0 1 1-5.908-.002 2.954 2.954 0 0 1 5.908.002Z"
			clipRule="evenodd"
		/>
	</Svg>
);
export default IconSeePw;
