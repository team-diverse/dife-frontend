import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const IconDeleteMember = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={64}
		height={64}
		fill="none"
		{...props}
	>
		<G
			stroke="#2964E0"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={4}
		>
			<Path d="M20.752 8h22.493C51.107 8 56 13.55 56 21.404v21.192C56 50.45 51.107 56 43.242 56h-22.49C12.891 56 8 50.45 8 42.596V21.404C8 13.55 12.914 8 20.752 8Z" />
			<Path d="M23.386 25.346v-.137m-.122-.408a.6.6 0 1 0 .007 1.198.6.6 0 0 0-.007-1.198ZM40.615 25.346v-.137m-.018-.408a.601.601 0 1 0 .007 1.198.601.601 0 0 0-.007-1.198ZM24.112 41.109C26.032 38.61 28.86 37.05 32 37.05c3.14 0 5.968 1.56 7.888 4.058" />
		</G>
	</Svg>
);

export default IconDeleteMember;
