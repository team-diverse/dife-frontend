import * as React from "react";
import Svg, { Rect, Circle, Path } from "react-native-svg";
const IconCircleGallery = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={48}
		height={48}
		fill="none"
		{...props}
	>
		<Rect width={48} height={48} fill="#B0D0FF" rx={24} />
		<Rect
			width={18}
			height={18}
			x={15}
			y={15}
			stroke="#fff"
			strokeWidth={2}
			rx={3}
		/>
		<Circle cx={21} cy={21} r={2} stroke="#fff" strokeWidth={2} />
		<Path
			stroke="#fff"
			strokeLinejoin="round"
			strokeWidth={2}
			d="m16 32 4.773-4.773a2 2 0 0 1 2.615-.186l1.224.918a2 2 0 0 0 2.615-.186L33 22"
		/>
	</Svg>
);
export default IconCircleGallery;
