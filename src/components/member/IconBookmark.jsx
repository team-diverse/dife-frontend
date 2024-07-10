import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconBookmark = ({ props, color }) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		{...props}
	>
		<Path
			fill={color}
			fillRule="evenodd"
			d="M15.225 9.57h-6.45a.71.71 0 0 1-.706-.713.71.71 0 0 1 .705-.712h6.45c.39 0 .706.319.706.712a.71.71 0 0 1-.705.713Zm4.273 2.87-.002-1.957C19.496 3.268 18.375 2 12 2s-7.496 1.268-7.496 8.482l-.002 1.959c-.009 5.343-.013 7.344.796 8.16.261.265.608.399 1.03.399.9 0 1.899-.862 2.957-1.775.938-.808 2-1.724 2.715-1.724.715 0 1.777.916 2.715 1.724C15.773 20.138 16.773 21 17.67 21c.423 0 .77-.134 1.031-.399.809-.816.805-2.817.796-8.16Z"
			clipRule="evenodd"
		/>
	</Svg>
);
export default IconBookmark;
