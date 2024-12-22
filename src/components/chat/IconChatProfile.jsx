import React, { useEffect, useState } from "react";
import Svg, { Path } from "react-native-svg";
import { Image } from "expo-image";
import { View, StyleSheet } from "react-native";
import * as Sentry from "@sentry/react-native";

import { getProfileImageByFileId } from "config/api";
import IconProfileUser32 from "@components/common/IconProfileUser32";
import IconProfileUser24 from "@components/common/IconProfileUser24";

const IconChatProfile = ({ size = 48, fileId, ...props }) => {
	const [profilePresignUrl, setProfilePresignUrl] = useState(null);

	const getProfileImage = async () => {
		try {
			if (fileId === undefined) {
				return;
			}
			const response = await getProfileImageByFileId(fileId);
			setProfilePresignUrl(response.data);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"프로필 이미지 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getProfileImage();
	}, [fileId]);

	const pathData = `
		M0 ${size * 0.2083}C0 ${size * 0.0933} ${size * 0.0933} 0 ${size * 0.2083} 0H${size * 0.5}
		C${size * 0.7761} 0 ${size} ${size * 0.2182} ${size} ${size * 0.5}
		C${size} ${size * 0.7818} ${size * 0.7761} ${size} ${size * 0.5} ${size}H${size * 0.2083}
		C${size * 0.0933} ${size} 0 ${size * 0.9067} 0 ${size * 0.7917}V${size * 0.2083}Z
	`;

	return (
		<View style={[styles.container, { width: size, height: size }]}>
			<Svg width={size} height={size} style={styles.svg} {...props}>
				<Path fill="#B0D0FF60" d={pathData} />
			</Svg>

			{profilePresignUrl ? (
				<View
					style={[
						styles.imageContainer,
						{ width: size, height: size },
					]}
				>
					<View
						style={[
							styles.maskContainer,
							{ width: size, height: size },
						]}
					>
						<Image
							source={{ uri: profilePresignUrl }}
							style={[
								styles.image,
								{ width: size, height: size },
							]}
							contentFit="cover"
							cachePolicy="memory-disk"
							transition={150}
						/>
					</View>
				</View>
			) : (
				<View
					style={[
						styles.fallbackContainer,
						{ top: size * 0.25, left: size * 0.125 },
					]}
				>
					{size <= 36 ? <IconProfileUser24 /> : <IconProfileUser32 />}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
	},
	svg: {
		position: "absolute",
	},
	imageContainer: {
		position: "absolute",
		overflow: "hidden",
	},
	maskContainer: {
		overflow: "hidden",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 10,
	},
	image: {
		position: "absolute",
	},
	fallbackContainer: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default IconChatProfile;
