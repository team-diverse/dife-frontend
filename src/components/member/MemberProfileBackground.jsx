import * as React from "react";
import Svg, {
	Circle,
	Defs,
	LinearGradient,
	Stop,
	ClipPath,
} from "react-native-svg";
import { Image } from "expo-image";
import { View, StyleSheet } from "react-native";

const MemberProfileBackground = ({ profileImage, ...props }) => (
	<View style={styles.container}>
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={116}
			height={116}
			fill="none"
			style={styles.svg}
			{...props}
		>
			<Circle cx={58} cy={58} r={58} fill="url(#a)" />
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
		{profileImage && (
			<Image
				source={{ uri: profileImage }}
				style={styles.image}
				cachePolicy="memory-disk"
				transition={150}
			/>
		)}
	</View>
);

const styles = StyleSheet.create({
	container: {
		width: 116,
		height: 116,
		position: "relative",
	},
	svg: {
		position: "absolute",
	},
	image: {
		width: 116,
		height: 116,
		borderRadius: 58,
	},
});

export default MemberProfileBackground;
