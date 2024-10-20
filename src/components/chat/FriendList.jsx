import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

import IconChatProfile from "@components/chat/IconChatProfile";
import IconSend from "@components/common/IconSend";
import IconMenu from "@components/chat/IconMenu";
import { createSingleChatroom } from "config/api";
import { useNavigation } from "@react-navigation/native";
import { useWebSocket } from "context/WebSocketContext";
import { getMyMemberId } from "util/secureStoreUtils";

const FriendList = ({ memberId, name, imageName }) => {
	const navigation = useNavigation("");
	const { chatrooms, subscribeToNewChatroom } = useWebSocket();

	const isRelevantSingleChatroom = (chatroom, myMemberId, otherMemberId) => {
		if (chatroom.chatroomType !== "SINGLE") {
			return false;
		}
		const members = chatroom.members;
		const memberIds = members.map((member) => member.id);
		return (
			memberIds.includes(myMemberId) && memberIds.includes(otherMemberId)
		);
	};

	const handleCreateSingleChatroom = async () => {
		try {
			const myMemberId = await getMyMemberId();
			let chatroomInfo = chatrooms.find((chatroom) =>
				isRelevantSingleChatroom(chatroom, myMemberId, memberId),
			);

			if (!chatroomInfo) {
				const response = await createSingleChatroom(memberId, name);
				chatroomInfo = response.data;
				subscribeToNewChatroom(chatroomInfo.id);
			}
			navigation.replace("ChatRoomPage", {
				chatroomInfo,
			});
		} catch (error) {
			console.log("채팅방 생성 에러:", error);
		}
	};

	return (
		<>
			<TouchableOpacity
				style={styles.rectangle}
				onPress={() =>
					navigation.navigate("ConnectProfilePage", {
						memberId: memberId,
					})
				}
			>
				<View style={styles.containerContext}>
					<View style={styles.iconTextContainer}>
						<View style={styles.icon}>
							<IconChatProfile imageName={imageName} />
						</View>
						<Text style={styles.textName}>{name}</Text>
					</View>
					<View style={styles.containerIcon}>
						<TouchableOpacity onPress={handleCreateSingleChatroom}>
							<View style={styles.rectangleChat}>
								<IconSend />
							</View>
						</TouchableOpacity>
						<View style={styles.iconMenu}>
							<IconMenu />
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		position: "relative",
		width: "100%",
		height: 72,
		backgroundColor: CustomTheme.bgBasic,
		flexDirection: "row",
		alignItems: "center",
	},
	containerContext: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	iconTextContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		marginLeft: 24,
	},
	textName: {
		marginLeft: 22,
		fontSize: 14,
		lineHeight: 17,
		fontFamily: "NotoSansCJKkr-Bold",
	},
	containerIcon: {
		flexDirection: "row",
		alignItems: "center",
	},
	rectangleChat: {
		width: 42,
		height: 42,
		borderWidth: 1,
		borderColor: "#B0D0FF",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	iconMenu: {
		marginRight: 16,
	},
});

export default FriendList;
