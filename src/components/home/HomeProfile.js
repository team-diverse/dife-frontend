import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";

import { CustomTheme } from "@styles/CustomTheme";
import { getProfileImageByFileId } from "config/api";

const HomeProfile = ({ fileId, back = false }) => {
	const containerStyle = back ? { width: 100.647, height: 118 } : null;

	const [presignUrl, setPresignUrl] = useState(null);

	useEffect(() => {
		const getPresignUrl = async () => {
			try {
				if (fileId == null) {
					return;
				}
				const response = await getProfileImageByFileId(fileId);
				setPresignUrl(response.data);
			} catch (error) {
				console.error(
					"홈 카드 프로필 이미지 조회 실패:",
					error.response ? error.response.data : error.message,
				);
			}
		};
		getPresignUrl();
	}, [fileId]);

	return (
		<>
			<View style={[styles.rectangle, containerStyle]}>
				{fileId && (
					<Image source={{ uri: presignUrl }} style={styles.image} />
				)}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		width: 116,
		height: 136,
		backgroundColor: CustomTheme.textDisable,
		borderRadius: 16,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
});

export default HomeProfile;
