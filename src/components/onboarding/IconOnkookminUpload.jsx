import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconStudentsUpload = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={99}
		height={99}
		fill="none"
		{...props}
	>
		<G
			stroke="#2964E0"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={6.188}
		>
			<Path d="M30.483 37.062h-3.849c-8.394 0-15.2 6.806-15.2 15.2v20.11c0 8.39 6.806 15.196 15.2 15.196h45.912c8.394 0 15.2-6.806 15.2-15.196v-20.15c0-8.37-6.785-15.16-15.155-15.16h-3.89M49.59 9.04v49.669M37.562 21.117 49.586 9.04l12.028 12.078" />
		</G>
	</Svg>
);
export default IconStudentsUpload;
