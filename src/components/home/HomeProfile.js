import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";

import { getProfileImageByFileId } from "config/api";
import IconProfileUser48 from "@components/common/IconProfileUser48";

const HomeProfile = ({ fileId, back = false }) => {
	const containerStyle = back ? { width: 100.647, height: 118 } : null;
	const [presignUrl, setPresignUrl] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getPresignUrl = async () => {
			try {
				setPresignUrl(null);
				setIsLoading(true);

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
			} finally {
				setIsLoading(false);
			}
		};
		getPresignUrl();
	}, [fileId]);

	return (
		<>
			<View style={[styles.rectangle, containerStyle]}>
				{!isLoading ? (
					presignUrl ? (
						<Image
							source={{ uri: presignUrl }}
							style={styles.image}
						/>
					) : (
						<IconProfileUser48 />
					)
				) : null}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		width: 116,
		height: 136,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#B0D0FF",
		borderRadius: 16,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
});

export default HomeProfile;
