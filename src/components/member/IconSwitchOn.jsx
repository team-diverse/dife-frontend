import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconSwitchOn = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={36}
		height={36}
		fill="none"
		{...props}
	>
		<G fillRule="evenodd" clipRule="evenodd">
			<Path
				fill="#2964E0"
				d="M21.817 7.566h-7.635C8.43 7.566 3.75 12.25 3.75 18.006c0 5.748 4.68 10.425 10.432 10.425h7.635c5.753 0 10.433-4.677 10.433-10.425 0-5.757-4.68-10.44-10.433-10.44Z"
			/>
			<Path
				fill="#fff"
				d="M21.807 23.618a5.614 5.614 0 0 1-5.605-5.61 5.613 5.613 0 0 1 5.605-5.61 5.613 5.613 0 0 1 5.606 5.61 5.614 5.614 0 0 1-5.606 5.61Z"
			/>
		</G>
	</Svg>
);
export default IconSwitchOn;
