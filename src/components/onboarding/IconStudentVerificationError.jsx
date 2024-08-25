import * as React from "react";
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg";

const IconStudentVerificationError = (props) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={80}
		height={80}
		fill="none"
		{...props}
	>
		<Circle cx={40} cy={40} r={40} fill="#FF3E3E" />
		<G
			stroke="#fff"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={4.5}
			clipPath="url(#a)"
		>
			<Path d="M40.986 27.615v13.257M40.985 50.39h.03" />
		</G>
		<Defs>
			<ClipPath id="a">
				<Path fill="#fff" d="M18.982 17.627h43.39v43.39h-43.39z" />
			</ClipPath>
		</Defs>
	</Svg>
);

export default IconStudentVerificationError;
