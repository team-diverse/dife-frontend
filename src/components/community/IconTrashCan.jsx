import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconTrashCan = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={16}
		height={16}
		fill="none"
		{...props}
	>
		<G fill="#8C8D91" fillRule="evenodd" clipRule="evenodd">
			<Path d="M3.539 6.118a.48.48 0 0 1 .513.444l.392 5.36a1.643 1.643 0 0 0 1.638 1.524h3.836c.861 0 1.576-.665 1.638-1.523l.392-5.36a.48.48 0 1 1 .957.07l-.391 5.36a2.603 2.603 0 0 1-2.596 2.413H6.082a2.603 2.603 0 0 1-2.595-2.413l-.392-5.36a.48.48 0 0 1 .444-.515ZM2.231 4.59a.48.48 0 0 1 .48-.48H13.29a.48.48 0 1 1 0 .96H2.71a.48.48 0 0 1-.48-.48Z" />
			<Path d="M6.684 1.93h2.637a1.279 1.279 0 0 1 1.242.976l.322 1.585a.48.48 0 1 1-.941.191l-.318-1.567a.319.319 0 0 0-.305-.225h-2.64a.32.32 0 0 0-.306.225L6.06 4.68a.48.48 0 1 1-.941-.19l.319-1.584a1.28 1.28 0 0 1 1.247-.977ZM6.785 7.55a.48.48 0 0 1 .48.48v2.886a.48.48 0 0 1-.96 0V8.031a.48.48 0 0 1 .48-.48Zm2.163 0a.48.48 0 0 1 .48.48v2.886a.48.48 0 0 1-.96 0V8.031a.48.48 0 0 1 .48-.48Z" />
		</G>
	</Svg>
);
export default IconTrashCan;
