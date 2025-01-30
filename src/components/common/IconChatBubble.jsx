import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconChatBubble = ({ version = 1 }) => (
	<>
		{version === 1 ? (
			<Svg
				xmlns="http://www.w3.org/2000/svg"
				width={199}
				height={74}
				fill="none"
			>
				<Path
					fill="#E6F3FF"
					fillRule="evenodd"
					d="M10 0C4.477 0 0 4.477 0 10v45.993c0 5.523 4.477 10 10 10h9.776a.99.99 0 0 0 .104.541l3.36 6.682a1 1 0 0 0 1.788 0l3.36-6.682a.99.99 0 0 0 .104-.54H188.73c5.523 0 10-4.478 10-10V10c0-5.523-4.477-10-10-10H10Z"
					clipRule="evenodd"
				/>
			</Svg>
		) : (
			<Svg
				xmlns="http://www.w3.org/2000/svg"
				width={177}
				height={74}
				fill="none"
			>
				<Path
					fill="#E6F3FF"
					fillRule="evenodd"
					d="M30.41 1.008c-.354-.783-1.466-.783-1.82 0L25.416 8H10C4.477 8 0 12.477 0 18v46c0 5.523 4.477 10 10 10h157c5.523 0 10-4.477 10-10V18c0-5.523-4.477-10-10-10H33.583L30.41 1.008Z"
					clipRule="evenodd"
				/>
			</Svg>
		)}
	</>
);
export default IconChatBubble;
