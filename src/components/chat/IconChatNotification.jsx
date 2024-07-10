import * as React from "react";
import Svg, { Path } from "react-native-svg";
const IconChatNotification = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		{...props}
	>
		<Path
			fill="#2964E0"
			fillRule="evenodd"
			d="M14.605 17.775a2.353 2.353 0 0 1-2.35 2.35 2.353 2.353 0 0 1-2.349-2.35c0-.006-.003-.01-.003-.016h4.705c0 .006-.003.01-.003.016Zm5.641-3.983-.466-.99a4.822 4.822 0 0 1-.457-2.043V9.441a7.074 7.074 0 0 0-7.067-7.066A7.074 7.074 0 0 0 5.19 9.441v1.318c0 .701-.159 1.407-.458 2.043l-.465.99a2.768 2.768 0 0 0 .167 2.675 2.77 2.77 0 0 0 2.35 1.292H8.41c0 .006-.003.01-.003.016a3.854 3.854 0 0 0 3.85 3.85 3.854 3.854 0 0 0 3.85-3.85c0-.006-.004-.01-.004-.016h1.626a2.77 2.77 0 0 0 2.35-1.292 2.77 2.77 0 0 0 .168-2.675Z"
			clipRule="evenodd"
		/>
	</Svg>
);
export default IconChatNotification;
