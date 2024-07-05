import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconFriendNumber = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={16}
		height={16}
		fill="none"
		{...props}
	>
		<G fill="#2964E0" fillRule="evenodd" clipRule="evenodd">
			<Path d="M10.848 8.205c-.753 0-1.467.153-2.067.407 2.107.613 3.594 2.073 3.627 3.773 1.093-.147 2.267-.553 2.267-1.687 0-1.353-1.754-2.493-3.827-2.493ZM11.528 7.147h.02a2.575 2.575 0 0 0 2.573-2.574 2.575 2.575 0 0 0-3.373-2.446c.46.68.727 1.5.727 2.38 0 .926-.3 1.786-.807 2.486.267.1.56.154.86.154ZM6.205 9.334c-2.642 0-4.873 1.443-4.873 3.152 0 1.96 2.78 2.186 4.873 2.186 1.205 0 4.872 0 4.872-2.2 0-1.7-2.231-3.138-4.872-3.138ZM6.554 7.85h.02a3.246 3.246 0 0 0 3.243-3.243 3.247 3.247 0 0 0-3.243-3.244 3.246 3.246 0 0 0-3.242 3.242c-.003.864.33 1.676.938 2.289.609.613 1.42.952 2.284.955Z" />
		</G>
	</Svg>
);
export default IconFriendNumber;
