import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
	Swipeable,
	GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";

import { CustomTheme } from "@styles/CustomTheme";
import { useWebSocket } from "context/WebSocketContext";
import { getRefreshToken } from "util/secureStoreUtils";

import IconChatProfile from "@components/chat/IconChatProfile";
import IconChatroomExit from "@components/chat/IconChatroomExit";

const { fontCaption, fontNavi } = CustomTheme;

const ChatroomItem = ({
	chatroomInfo,
	content,
	lastChatCreated,
	myMemberId,
	onCompleteExit,
	unreadChatsCount,
}) => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const swipeableRef = useRef(null);
	const otherMember = chatroomInfo.members.find(
		(member) => member.id !== myMemberId,
	);
	const otherMemberProfileImageId = otherMember?.profileImg?.id;
	const username = otherMember?.username ?? "Unknown";
	const screenWidth = Dimensions.get("window").width;
	const { publishMessage, unsubscribeToChatroom } = useWebSocket();
	const [isSwiping, setIsSwiping] = useState(false);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const fetchToken = async () => {
			const token = await getRefreshToken();
			setToken(token);
		};

		fetchToken();
	}, []);

	const exitChatroomAlert = (chatroomId) => {
		Alert.alert(
			"",
			"해당 채팅방을 나가시겠어요?",
			[
				{
					text: t("cancelButton"),
					style: "cancel",
				},
				{
					text: t("exitChatroomButton"),
					onPress: async () => {
						await publishMessage({
							chatType: "EXIT",
							chatroomId: chatroomId,
							token,
						});
						await unsubscribeToChatroom(chatroomId, token);
						swipeableRef.current?.close();
						onCompleteExit();
					},
				},
			],
			{ cancelable: false },
		);
	};

	const renderRightActions = (chatroomId) => {
		return (
			<TouchableOpacity
				style={styles.containerExitChat}
				onPress={() => exitChatroomAlert(chatroomId)}
			>
				<IconChatroomExit />
				<Text style={styles.textExitChat}>{t("exitChatroom")}</Text>
			</TouchableOpacity>
		);
	};

	const handleChatroomPage = async () => {
		const chatFirst = await SecureStore.getItemAsync("chatFirstCheck");
		if (!isSwiping) {
			if (chatFirst === "true") {
				navigation.navigate("ChatRoomPage", { chatroomInfo });
			} else {
				navigation.navigate("ChatRoomGuidePage", { chatroomInfo });
			}
		}
	};

	return (
		<GestureHandlerRootView style={styles.container}>
			<Swipeable
				ref={swipeableRef}
				renderRightActions={() => renderRightActions(chatroomInfo.id)}
				onSwipeableOpen={() => setIsSwiping(true)}
				onSwipeableClose={() => setIsSwiping(false)}
				friction={2}
				rightThreshold={5}
			>
				<TouchableOpacity
					style={[styles.rectangle, { width: screenWidth }]}
					onPress={handleChatroomPage}
					disabled={isSwiping}
					pointerEvent={isSwiping ? "auto" : "none"}
				>
					<View style={styles.notify}>
						<View style={styles.iconTextContainer}>
							<View style={styles.icon}>
								<IconChatProfile
									fileId={otherMemberProfileImageId}
								/>
							</View>
							<View style={styles.textContainer}>
								<Text style={styles.textName}>{username}</Text>
								<Text
									style={[
										styles.textContext,
										unreadChatsCount > 0 && {
											color: CustomTheme.primaryMedium,
											fontFamily: "NotoSansCJKkr-Bold",
										},
									]}
								>
									{content}
								</Text>
							</View>
						</View>
						<View
							style={{ alignItems: "flex-end", marginRight: 25 }}
						>
							<Text style={styles.textTime}>
								{lastChatCreated}
							</Text>
							{unreadChatsCount > 0 && (
								<View style={styles.containerUnreadChatsCount}>
									<Text style={styles.textUnreadChatsCount}>
										{unreadChatsCount}
									</Text>
								</View>
							)}
						</View>
					</View>
				</TouchableOpacity>
			</Swipeable>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	containerExitChat: {
		justifyContent: "center",
		alignItems: "center",
		width: 78,
		height: 80,
		backgroundColor: CustomTheme.pointYellow,
	},
	textExitChat: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.bgBasic,
	},
	rectangle: {
		position: "relative",
		height: 80,
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
		marginTop: 14,
		marginBottom: 18,
		marginLeft: 24,
	},
	textContainer: {
		marginLeft: 22,
	},
	textName: {
		fontSize: 14,
		lineHeight: 17,
		fontFamily: "NotoSansCJKkr-Bold",
	},
	textContext: {
		...fontCaption,
		width: 187,
		height: 34,
		marginTop: 4,
	},
	textTime: {
		...fontNavi,
		color: CustomTheme.textDisable,
		marginTop: 14,
		marginBottom: 13,
	},
	containerUnreadChatsCount: {
		width: 21,
		height: 21,
		backgroundColor: CustomTheme.pointYellow,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	textUnreadChatsCount: {
		...fontCaption,
		color: CustomTheme.bgBasic,
	},
});

export default ChatroomItem;
