import React, { useState, useRef, useEffect } from "react";
import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	Animated,
	Dimensions,
	FlatList,
	Alert,
<<<<<<< HEAD
	Platform,
	NativeModules,
	KeyboardAvoidingView,
=======
>>>>>>> db51006 (Dev (#148))
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import ChatRoomStyles from "@pages/chat/ChatRoomStyles";
import { useWebSocket } from "context/WebSocketContext";
import formatKoreanTime from "util/formatTime";
import { getMyMemberId } from "util/secureStoreUtils";
import { sortByIds } from "util/util";
import { getBookmarkedByChatroomId } from "config/api";

import ArrowRight from "@components/common/ArrowRight";
import ChatInputSend from "@components/chat/ChatInputSend";
import IconHamburgerMenu from "@components/chat/IconHamburgerMenu";
import IconChatProfile from "@components/chat/IconChatProfile";
import IconChatOut from "@components/chat/IconChatOut";
import IconChatNotification from "@components/chat/IconChatNotification";
import IconChatSetting from "@components/chat/IconChatSetting";
import ChatBubble from "@pages/chat/ChatBubble/ChatBubble";

const ChatRoomPage = ({ route }) => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const [menuOpen, setMenuOpen] = useState(false);
	const menuWidth = 259;
	const screenWidth = Dimensions.get("window").width;
	const menuAnim = useRef(new Animated.Value(screenWidth)).current;
	const { messages } = useWebSocket();
	const { chatroomInfo } = route.params;
	const [memberId, setMemberId] = useState(null);
	const members = sortByIds(chatroomInfo.members);
	const otherMember = members.find((member) => member.id !== memberId);
	const flatListRef = useRef(null);
	const [bookmarkedCount, setBookmarkedCount] = useState(0);
	const { publishMessage } = useWebSocket();
	const { StatusBarManager } = NativeModules;
	const isAtBottomRef = useRef(true);
	const scrollOffsetRef = useRef(0);

	useEffect(() => {
		const fetchMyMemberId = async () => {
			const myMemberId = await getMyMemberId();
			setMemberId(myMemberId);
		};
		fetchMyMemberId();
	}, []);

	useEffect(() => {
		Platform.OS == "ios"
			? StatusBarManager.getHeight((statusBarFrameData) => {
					setStatusBarHeight(statusBarFrameData.height);
				})
			: null;
	}, []);

	useEffect(() => {
		if (isAtBottomRef.current && flatListRef.current) {
			setTimeout(() => {
				flatListRef.current.scrollToEnd({ animated: true });
			}, 100);
		}
	}, [messages]);

	const [statusBarHeight, setStatusBarHeight] = useState(0);

	const handleContentSizeChange = () => {
		if (flatListRef.current) {
			flatListRef.current.scrollToEnd({ animated: true });
		}
	};
	const groupMessages = (messages) => {
		const groupedMessages = [];
		let currentGroup = [];

		messages.forEach((message, index) => {
			const isFirstMessage = index === 0;
			const isDifferentUser =
				!isFirstMessage &&
				message.member.id !== messages[index - 1].member.id;

			if (isFirstMessage || isDifferentUser) {
				if (currentGroup.length > 0) {
					groupedMessages.push(currentGroup);
				}
				currentGroup = [message];
			} else {
				currentGroup.push(message);
			}
		});

		if (currentGroup.length > 0) {
			groupedMessages.push(currentGroup);
		}

		return groupedMessages;
	};

	const handleGoBack = () => {
		navigation.goBack();
	};

	const toggleMenu = async () => {
		if (menuOpen) {
			Animated.timing(menuAnim, {
				toValue: screenWidth,
				duration: 100,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(menuAnim, {
				toValue: screenWidth - menuWidth,
				duration: 100,
				useNativeDriver: true,
			}).start();
		}
		setMenuOpen(!menuOpen);

		const response = await getBookmarkedByChatroomId(chatroomInfo.id);
		setBookmarkedCount(response.data.length);
	};

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
						});
						navigation.navigate("Chat");
					},
				},
			],
			{ cancelable: false },
		);
	};

	const handleScroll = (event) => {
		const { contentOffset, contentSize, layoutMeasurement } =
			event.nativeEvent;
		scrollOffsetRef.current = contentOffset.y;
		const isNearBottom =
			contentOffset.y + layoutMeasurement.height >=
			contentSize.height - 20;
		isAtBottomRef.current = isNearBottom;
	};

	const handleInputFocus = () => {
		if (flatListRef.current) {
			setTimeout(() => {
				flatListRef.current.scrollToEnd({ animated: true });
			}, 100);
		}
	};

	return (
		<SafeAreaView style={ChatRoomStyles.container}>
			<View style={ChatRoomStyles.containerTopBar}>
				<View style={ChatRoomStyles.containerBackName}>
					<TouchableOpacity
						style={ChatRoomStyles.iconArrow}
						onPress={handleGoBack}
					>
						<ArrowRight color="#000" />
					</TouchableOpacity>
					<Text style={ChatRoomStyles.textTopBar}>
						{chatroomInfo.name}
					</Text>
				</View>
				<TouchableOpacity
					style={ChatRoomStyles.iconHamburgerMenu}
					onPress={toggleMenu}
				>
					<IconHamburgerMenu />
				</TouchableOpacity>
			</View>

			<View style={ChatRoomStyles.containerChat}>
				<FlatList
					ref={flatListRef}
					data={groupMessages(messages[chatroomInfo.id] || [])}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<>
							{item.map((msg, idx) => {
								return (
									<ChatBubble
										key={msg.id}
										fileId={otherMember.profileImg?.id}
										username={msg.member.username}
										message={msg.message}
										time={formatKoreanTime(msg.created)}
										isMine={msg.member.id === memberId}
										isHeadMessage={idx === 0}
										chatroomId={msg.singleChatroom.id}
										chatId={msg.id}
									/>
								);
							})}
						</>
					)}
					onContentSizeChange={handleContentSizeChange}
					onScroll={handleScroll}
				/>
			</View>
			<KeyboardAvoidingView
				behavior="padding"
				keyboardVerticalOffset={statusBarHeight - 50}
				onContentSizeChange={handleContentSizeChange}
			>
				<ChatInputSend
					chatroomId={chatroomInfo.id}
					onFocus={handleInputFocus}
				/>
			</KeyboardAvoidingView>

			{menuOpen && (
				<TouchableOpacity
					onPress={toggleMenu}
					style={[ChatRoomStyles.menuBackground, { top: insets.top }]}
				/>
			)}
			<Animated.View
				style={[
					ChatRoomStyles.menu,
					{
						top: insets.top,
						width: menuWidth,
						transform: [{ translateX: menuAnim }],
					},
				]}
			>
				<View style={ChatRoomStyles.containerGray}>
					<TouchableOpacity
						onPress={() => exitChatroomAlert(chatroomInfo.id)}
					>
						<IconChatOut />
					</TouchableOpacity>

					<View style={ChatRoomStyles.containerIcon}>
						<View style={{ marginRight: 7 }}>
							<IconChatNotification />
						</View>
						<IconChatSetting />
					</View>
				</View>
				<View style={{ marginBottom: 4 }}>
					<Text
						style={[
							ChatRoomStyles.textDrawer,
							{ marginTop: 12, marginBottom: 8 },
						]}
					>
						{t("chatParticipant")}
					</Text>
					{members.map((member) => (
						<View
							key={member.id}
							style={ChatRoomStyles.containerChatPeople}
						>
							<IconChatProfile fileId={member.profileImg?.id} />
							<Text style={ChatRoomStyles.textChatPeople}>
								{member.username}
							</Text>
						</View>
					))}
				</View>
				<View style={ChatRoomStyles.line} />
				<TouchableOpacity
					style={ChatRoomStyles.containerDrawer}
					onPress={() =>
						navigation.navigate("ChatBookmarkPage", {
							chatroomId: chatroomInfo.id,
							userName: chatroomInfo.members[0].username,
						})
					}
				>
					<View style={ChatRoomStyles.containerDrawerTextCount}>
						<Text style={ChatRoomStyles.textDrawer}>
							{t("chatBookmark")}
						</Text>
						<View style={ChatRoomStyles.containerDrawerCount}>
							<Text style={ChatRoomStyles.textDrawerCount}>
								{bookmarkedCount}
							</Text>
						</View>
					</View>
					<View style={ChatRoomStyles.iconReverseArrow}>
						<ArrowRight color="#000" />
					</View>
				</TouchableOpacity>
				<View style={ChatRoomStyles.line} />
			</Animated.View>
		</SafeAreaView>
	);
};

export default ChatRoomPage;
