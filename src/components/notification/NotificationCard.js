import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";

import { CustomTheme } from "@styles/CustomTheme";

import IconAddFriend24 from "@components/Icon24/IconAddFriend24";
import IconHeart24 from "@components/Icon24/IconHeart24";
import { useNavigation } from "@react-navigation/native";

const { fontCaption, fontNavi } = CustomTheme;

const NotificationCard = ({
	notificationId,
	type,
	typeId,
	content,
	created,
}) => {
	const navigation = useNavigation();
	const [isRead, setIsRead] = useState(false);

	let iconSvg;
	if (type === "CONNECT") {
		iconSvg = <IconAddFriend24 />;
	} else if (type === "POST") {
		iconSvg = <IconHeart24 />;
	} else {
		iconSvg = <Text>icon</Text>;
	}

	useEffect(() => {
		const getReadStatus = async () => {
			const readStatus = await SecureStore.getItemAsync(
				`notification-${notificationId}`,
			);
			if (readStatus === "true") {
				setIsRead(true);
			}
		};

		getReadStatus();
	}, [typeId]);

	const handleNotification = async () => {
		setIsRead(true);
		await SecureStore.setItemAsync(
			`notification-${notificationId}`,
			"true",
		);
		if (type === "CONNECT") {
			navigation.navigate("ConnectProfilePage", { memberId: typeId });
		} else if (type === "POST") {
			navigation.navigate("PostPage", { postId: typeId });
		} else {
			null;
		}
	};

	return (
		<TouchableOpacity
			style={[styles.rectangle, isRead && { opacity: 0.4 }]}
			onPress={handleNotification}
		>
			<View style={styles.notify}>
				<View style={styles.iconTextContainer}>
					<View style={styles.icon}>{iconSvg}</View>
					<View style={styles.textContainer}>
						<Text style={styles.context}>{content}</Text>
					</View>
				</View>
				<Text style={styles.time}>{created}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		position: "relative",
		width: "100%",
		height: 54,
		backgroundColor: CustomTheme.bgBasic,
		flexDirection: "row",
		alignItems: "center",
	},
	notify: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	iconTextContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		width: 24,
		height: 24,
		marginLeft: 24,
		marginRight: 12,
	},
	textContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		width: 205,
	},
	context: {
		...fontCaption,
	},
	time: {
		...fontNavi,
		color: CustomTheme.textDisable,
		marginRight: 28,
	},
});

export default NotificationCard;
