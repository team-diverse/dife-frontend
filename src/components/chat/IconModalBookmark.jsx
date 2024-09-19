import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconModalBookmark = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={16}
		height={16}
		fill="none"
		{...props}
	>
		<Path
			fill="#AFB0B3"
			fillRule="evenodd"
			d="M9.68 1c2.226 0 3.503 1.102 3.503 3.022v9.54c0 .4-.206.76-.553.962a1.105 1.105 0 0 1-1.11.009l-3.912-2.21-3.948 2.214a1.106 1.106 0 0 1-1.108-.011A1.103 1.103 0 0 1 2 13.565V3.9C2 2.057 3.278 1 5.506 1h4.173Zm0 .984H5.505c-1.673 0-2.522.645-2.522 1.917v9.664c0 .062.036.095.065.112.03.018.077.032.13.001l4.189-2.35a.494.494 0 0 1 .483.002l4.152 2.345a.122.122 0 0 0 .13 0 .126.126 0 0 0 .065-.114V3.947c-.005-.565-.114-1.963-2.519-1.963Zm.287 3.432a.492.492 0 0 1 0 .984H5.165a.492.492 0 0 1 0-.984h4.802Z"
			clipRule="evenodd"
		/>
	</Svg>
);

export default IconModalBookmark;
