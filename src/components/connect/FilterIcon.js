import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FilterIcon = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		fill="none"
		{...props}
	>
		<Path
			fill="#E6F3FF"
			d="M12 6.667a1.333 1.333 0 1 0 0 2.666 1.333 1.333 0 0 0 0-2.666Zm-3.774 0a4.001 4.001 0 0 1 7.547 0h9.56a1.333 1.333 0 1 1 0 2.666h-9.56a4.002 4.002 0 0 1-7.547 0h-1.56a1.333 1.333 0 0 1 0-2.666h1.56Zm11.774 8a1.333 1.333 0 1 0 0 2.666 1.333 1.333 0 0 0 0-2.666Zm-3.774 0a4.002 4.002 0 0 1 7.547 0h1.56a1.333 1.333 0 1 1 0 2.666h-1.56a4.002 4.002 0 0 1-7.547 0h-9.56a1.333 1.333 0 1 1 0-2.666h9.56Zm-4.226 8a1.333 1.333 0 1 0 0 2.666 1.333 1.333 0 0 0 0-2.666Zm-3.774 0a4.002 4.002 0 0 1 7.547 0h9.56a1.333 1.333 0 1 1 0 2.666h-9.56a4.002 4.002 0 0 1-7.547 0h-1.56a1.333 1.333 0 1 1 0-2.666h1.56Z"
		/>
	</Svg>
);
export default FilterIcon;
