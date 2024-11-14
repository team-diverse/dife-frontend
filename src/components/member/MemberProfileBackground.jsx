import * as React from "react";
import Svg, {
	Circle,
	Defs,
	LinearGradient,
	Stop,
	Image as SvgImage,
	ClipPath,
} from "react-native-svg";

const MemberProfileBackground = ({ profileImage, ...props }) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={116}
		height={116}
		fill="none"
		{...props}
	>
		<Circle cx={58} cy={58} r={58} fill="url(#a)" />
		{profileImage && (
			<SvgImage
				x={0}
				y={0}
				width={116}
				height={116}
				preserveAspectRatio="xMidYMid slice"
				href={{ uri: profileImage }}
				clipPath="url(#clip)"
			/>
		)}
		<Defs>
			<LinearGradient
				id="a"
				x1={108}
				x2={3}
				y1={116}
				y2={-44}
				gradientUnits="userSpaceOnUse"
			>
				<Stop stopColor="#B0D0FF" />
			</LinearGradient>
			<ClipPath id="clip">
				<Circle cx={58} cy={58} r={58} />
			</ClipPath>
		</Defs>
	</Svg>
);

export default MemberProfileBackground;
