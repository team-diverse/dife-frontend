import React, { useState } from "react";
import {
	SafeAreaView,
	View,
	Text,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import ChatRoomStyles from "@pages/chat/ChatRoomStyles";

import ArrowRight from "@components/common/ArrowRight";
import ChatInputSend from "@components/chat/ChatInputSend";
import IconHamburgerMenu from "@components/chat/IconHamburgerMenu";
import formatKoreanTime from "util/formatTime";
import ChatBubble from "./ChatBubble/ChatBubble";
import IconChatBubble from "@components/common/IconChatBubble";

const ChatRoomGuidePage = ({ route }) => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const { chatroomInfo } = route.params;

	const [chatBubblePosition, setChatBubblePosition] = useState(null);
	const [chatBubble2Position, setChatBubble2Position] = useState(null);

	const chatroomData = [
		{
			isDateHeader: true,
			id: 1,
			created: "2025-03-02T14:00:00",
			lastChat: {
				created: "2025-03-02T14:00:00",
				id: 1,
				member: { id: "Dife", profileImg: null, username: "Dife" },
				message: "Hello",
			},
			members: [
				{ id: "Dife", profileImg: null, username: "Dife" },
				{ id: "Dife2", profileImg: null, username: "Dife2" },
			],
		},
		{
			id: 2,
			created: "2025-03-02T14:05:00",
			lastChat: {
				created: "2025-03-02T14:05:00",
				id: 2,
				member: { id: "Dife2", profileImg: null, username: "Dife2" },
				message: "안녕하세용~",
			},
			members: [
				{ id: "Dife", profileImg: null, username: "Dife" },
				{ id: "Dife2", profileImg: null, username: "Dife2" },
			],
		},
	];

	const handleCheck = async () => {
		await SecureStore.setItemAsync("chatFirstCheck", "true");
		navigation.replace("ChatRoomPage", { chatroomInfo });
	};

	const formatDateHeader = (date) => {
		const messageDate = new Date(date);
		const days = ["일", "월", "화", "수", "목", "금", "토"];
		const dayOfWeek = days[messageDate.getDay()];

		return `${messageDate.getFullYear()}.${String(messageDate.getMonth() + 1).padStart(2, "0")}.${String(messageDate.getDate()).padStart(2, "0")} ${dayOfWeek}요일`;
	};

	const handleChatBubblePosition = (position) => {
		setChatBubblePosition(position);
	};

	const handleChatBubble2Position = (position) => {
		setChatBubble2Position(position);
	};

	const topPosition =
		chatBubblePosition?.y !== undefined &&
		chatBubblePosition?.height !== undefined
			? chatBubblePosition.y + chatBubblePosition.height * 2
			: 0;

	const leftPosition =
		chatBubblePosition?.x !== undefined
			? chatBubblePosition.x - chatBubblePosition.height
			: 0;

	const topPosition2 =
		chatBubble2Position?.y !== undefined &&
		chatBubble2Position?.height !== undefined
			? chatBubble2Position.y - 80
			: 0;

	const leftPosition2 =
		chatBubble2Position?.x !== undefined
			? chatBubble2Position.x - chatBubble2Position.height * 1.5
			: 0;

	return (
		<>
			<SafeAreaView style={ChatRoomStyles.container}>
				<View style={ChatRoomStyles.containerTopBar}>
					<View style={ChatRoomStyles.containerBackName}>
						<View style={ChatRoomStyles.iconArrow}>
							<ArrowRight color="#000" />
						</View>
						<Text style={ChatRoomStyles.textTopBar}>Dife</Text>
					</View>
					<View style={ChatRoomStyles.iconHamburgerMenu}>
						<IconHamburgerMenu />
					</View>
				</View>

				<View style={ChatRoomStyles.containerChat}>
					<FlatList
						data={chatroomData}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<>
								{item.isDateHeader && (
									<>
										<View
											style={
												ChatRoomStyles.dateHeaderContainer
											}
										>
											<Text
												style={
													ChatRoomStyles.dateHeaderText
												}
											>
												{formatDateHeader(item.created)}
											</Text>
										</View>
										<View style={{ height: 85 }} />
									</>
								)}

								<ChatBubble
									username={item.lastChat.member.username}
									message={item.lastChat.message}
									time={formatKoreanTime(
										item.lastChat.created,
									)}
									isMine={item.lastChat.member.id === "Dife2"}
									isHeadMessage={true}
									chatroomId={item.id}
									chatId={item.lastChat.id}
									handleChatBubblePosition={
										handleChatBubblePosition
									}
									handleChatBubble2Position={
										handleChatBubble2Position
									}
								/>
							</>
						)}
					/>
				</View>
			</SafeAreaView>
			<ChatInputSend />
			<View style={ChatRoomStyles.chatInput} />
			<View style={ChatRoomStyles.chatInputBottom} />

			<View
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: "#0D237250",
				}}
			/>
			<View
				style={{
					position: "absolute",
					top: topPosition2,
					left: leftPosition2,
				}}
			>
				<IconChatBubble version={1} />
				<Text style={[ChatRoomStyles.iconGuideChatBubble, { top: 13 }]}>
					{t("chatGuideTranslate")}
				</Text>
			</View>

			<View
				style={{
					position: "absolute",
					top: topPosition,
					left: leftPosition,
				}}
			>
				<IconChatBubble version={2} />
				<Text
					style={[ChatRoomStyles.iconGuideChatBubble, { bottom: 13 }]}
				>
					{t("chatGuideChatBubble")}
				</Text>
			</View>

			<TouchableOpacity
				style={ChatRoomStyles.containerCheck}
				onPress={handleCheck}
			>
				<Text style={ChatRoomStyles.textCheck}>{t("guideCheck")}</Text>
			</TouchableOpacity>
		</>
	);
};

export default ChatRoomGuidePage;
