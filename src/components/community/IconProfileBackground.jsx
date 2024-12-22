import * as React from "react";
import Svg, {
	Circle,
	Defs,
	ClipPath,
	Image as SvgImage,
} from "react-native-svg";

const IconProfileBackground = ({ profileImage, ...props }) => (
	<Svg
		xmlns="http://www.w3.org/2000/svg"
		width={36}
		height={36}
		fill="none"
		{...props}
	>
		<Defs>
			<ClipPath id="clip">
				<Circle cx={18} cy={18} r={18} />
			</ClipPath>
		</Defs>
		<Circle cx={18} cy={18} r={18} fill="#B0D0FF" />
		{profileImage && (
			<SvgImage
				x={0}
				y={0}
				width={36}
				height={36}
				preserveAspectRatio="xMidYMid slice"
				href={{ uri: profileImage }}
				clipPath="url(#clip)"
			/>
		)}
	</Svg>
);
export default IconProfileBackground;
