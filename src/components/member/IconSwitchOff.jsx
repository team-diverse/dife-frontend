import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconSwitchOff = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={36}
		height={36}
		fill="none"
		{...props}
	>
		<G fillRule="evenodd" clipRule="evenodd">
			<Path
				fill="#CDCFD5"
				d="M14.181 7.566h7.636c5.752 0 10.432 4.683 10.432 10.44 0 5.748-4.68 10.425-10.433 10.425h-7.634c-5.753 0-10.433-4.677-10.433-10.425 0-5.757 4.68-10.44 10.432-10.44Z"
			/>
			<Path
				fill="#fff"
				d="M14.192 23.618a5.614 5.614 0 0 0 5.605-5.61 5.613 5.613 0 0 0-5.605-5.61 5.613 5.613 0 0 0-5.606 5.61 5.614 5.614 0 0 0 5.606 5.61Z"
			/>
		</G>
	</Svg>
);
export default IconSwitchOff;
