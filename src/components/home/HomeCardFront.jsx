import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
} from "react-native";
import * as Sentry from "@sentry/react-native";

import { CustomTheme } from "@styles/CustomTheme";
import { useNavigation } from "@react-navigation/native";
import { useWebSocket } from "context/WebSocketContext";
import { getRefreshToken } from "util/secureStoreUtils";
import { createChatroom } from "util/createChatroom";

import Tag from "@components/common/Tag";
import HomeProfile from "@components/home/HomeProfile";
import IconHeart24 from "@components/Icon24/IconHeart24";
import IconAddFriend24 from "@components/Icon24/IconAddFriend24";
import IconChat24 from "@components/Icon24/IconChat24";
import HomeLine from "@components/home/HomeLine";
import HomecardDifeF from "@components/home/HomecardDifeF";

const { fontCaption } = CustomTheme;

const HomeCardFront = ({
	memberId,
	fileId,
	tags,
	introduction,
	name,
	country,
	onPress,
	isLikedOnPress,
	isLikedActive,
}) => {
	const navigation = useNavigation();
	const { chatrooms, subscribeToNewChatroom, fetchChatroomMessages } =
		useWebSocket();

	const [tagHeight, setTagHeight] = useState(0);
	const [introductionLines, setIntroductionLines] = useState(1);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const fetchToken = async () => {
			const token = await getRefreshToken();
			setToken(token);
		};

		fetchToken();
	}, []);

	useEffect(() => {
		if (tagHeight > 40) {
			setIntroductionLines(2);
		} else {
			setIntroductionLines(4);
		}
	}, [tagHeight]);

	const handleTagLayout = (event) => {
		const { height } = event.nativeEvent.layout;
		setTagHeight(height);
	};

	const handleCreateSingleChatroom = async () => {
		try {
			const chatroomInfo = await createChatroom(
				memberId,
				name,
				chatrooms,
				subscribeToNewChatroom,
				fetchChatroomMessages,
				token,
			);
			navigation.navigate("ChatRoomPage", {
				chatroomInfo,
			});
		} catch (error) {
			Sentry.captureException(error);
		}
	};

	return (
		<View style={styles.rectangle}>
			<View style={styles.homecardDifeF}>
				<HomecardDifeF />
			</View>
			<View style={styles.homeProfile}>
				<HomeProfile fileId={fileId} />
				<View style={styles.tagContainer} onLayout={handleTagLayout}>
					<Tag tag={tags} />
				</View>
				<Text
					style={styles.introduction}
					numberOfLines={introductionLines}
					ellipsizeMode="tail"
				>
					{introduction}
				</Text>
				<View style={styles.myinfoContainer}>
					<Text
						style={styles.myinfo}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						<Text style={styles.textName}>{name}</Text> | {country}
					</Text>
				</View>
			</View>
			<View style={styles.connectIconContainer}>
				<TouchableOpacity
					style={styles.iconTouchable}
					onPress={isLikedOnPress}
				>
					<IconHeart24
						style={styles.connectIcon}
						active={isLikedActive}
					/>
				</TouchableOpacity>
				<HomeLine style={styles.connectIcon} />
				<TouchableOpacity
					style={styles.iconTouchable}
					onPress={onPress}
				>
					<IconAddFriend24 style={styles.connectIcon} active="true" />
				</TouchableOpacity>
				<HomeLine style={styles.connectIcon} />
				<TouchableOpacity
					style={styles.iconTouchable}
					onPress={handleCreateSingleChatroom}
				>
					<IconChat24 style={styles.connectIcon} active="true" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		width: 260,
		height: 360,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		...Platform.select({
			ios: {
				shadowColor: "#3C454E4A",
				shadowOffset: { width: 0, height: 3 },
				shadowOpacity: 0.71,
				shadowRadius: 3,
			},
			android: {
				elevation: 3,
			},
		}),
	},
	homecardDifeF: {
		position: "absolute",
		top: 69,
	},
	homeProfile: {
		position: "absolute",
		left: 20,
		top: 20,
	},
	tagContainer: {
		flexDirection: "row",
		maxWidth: 200,
		marginTop: 12,
		marginBottom: 6,
	},
	introduction: {
		...fontCaption,
		maxWidth: 200,
		marginTop: 6,
		marginBottom: 12,
	},
	myinfoContainer: {
		flexDirection: "row",
		maxWidth: 200,
	},
	textName: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Bold",
	},
	myinfo: {
		...fontCaption,
	},
	connectIconContainer: {
		position: "absolute",
		left: 10,
		bottom: 13,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	iconTouchable: {
		height: "100%",
		justifyContent: "center",
	},
	connectIcon: {
		marginHorizontal: 28,
	},
});

export default HomeCardFront;
