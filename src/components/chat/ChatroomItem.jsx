import React, { useState } from "react";
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

import { CustomTheme } from "@styles/CustomTheme";
import { useWebSocket } from "context/WebSocketContext";

import IconChatProfile from "@components/chat/IconChatProfile";
import IconChatroomExit from "@components/chat/IconChatroomExit";

const { fontCaption, fontNavi } = CustomTheme;

const ChatroomItem = ({
	chatroomInfo,
	context,
	time,
	myMemberId,
	onCompleteExit,
}) => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const otherMember = chatroomInfo.members.find(
		(member) => member.id !== myMemberId,
	);
	const otherMemberProfileImageId = otherMember.profileImg?.id;
	const username = otherMember.username;
	const screenWidth = Dimensions.get("window").width;
	const { publishMessage } = useWebSocket();
	const [isSwiping, setIsSwiping] = useState(false);

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
					text: "나가기",
					onPress: () => {
						publishMessage({
							chatType: "EXIT",
							chatroomId: chatroomId,
							memberId: myMemberId,
						});
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
				<Text style={styles.textExitChat}>채팅 나가기</Text>
			</TouchableOpacity>
		);
	};

	return (
		<GestureHandlerRootView style={styles.container}>
			<Swipeable
				renderRightActions={renderRightActions}
				onSwipeableOpen={() => setIsSwiping(true)}
				onSwipeableClose={() => setIsSwiping(false)}
				friction={2}
				rightThreshold={5}
			>
				<TouchableOpacity
					style={[styles.rectangle, { width: screenWidth }]}
					onPress={() => {
						!isSwiping &&
							navigation.navigate("ChatRoomPage", {
								chatroomInfo,
							});
					}}
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
								<Text style={styles.textContext}>
									{context}
								</Text>
							</View>
						</View>
						<Text style={styles.textTime}>{time}</Text>
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
		marginRight: 25,
	},
});

export default ChatroomItem;
