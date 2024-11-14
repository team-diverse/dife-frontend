import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import * as Sentry from "@sentry/react-native";

import { getProfileImageByFileId } from "config/api";

import IconProfileUser82 from "@components/common/IconProfileUser82";

const ConnectProfile = ({ fileId = null }) => {
	const [profilePresignUrl, setProfilePresignUrl] = useState(null);

	const getProfilePresignUrl = async () => {
		try {
			const presignUrl = await getProfileImageByFileId(fileId);
			setProfilePresignUrl(presignUrl.data);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"상세 프로필 이미지 url 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		if (fileId) {
			getProfilePresignUrl();
		}
	}, [fileId]);

	return (
		<View style={styles.rectangle}>
			{profilePresignUrl ? (
				<Image
					source={{ uri: profilePresignUrl }}
					style={styles.image}
					contentFit="cover"
				/>
			) : (
				<IconProfileUser82 />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		width: 156,
		height: 183,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#B0D0FF",
		borderRadius: 20,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
});

export default ConnectProfile;
