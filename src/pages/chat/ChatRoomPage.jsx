import React, {
	useState,
	useRef,
	useEffect,
	useMemo,
	useCallback,
} from "react";
import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	Animated,
	Dimensions,
	FlatList,
	Alert,
	Platform,
	NativeModules,
	Keyboard,
	KeyboardAvoidingView,
	AppState,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import ChatRoomStyles from "@pages/chat/ChatRoomStyles";
import { useWebSocket } from "context/WebSocketContext";
import { useFocusEffect } from "@react-navigation/native";
import formatTime from "util/formatTime";
import { getMyMemberId, getRefreshToken } from "util/secureStoreUtils";
import { sortByIds } from "util/util";
import {
	getBookmarkedByChatroomId,
	getChatsByChatroomId,
	getProfileById,
	changeChatroomHold,
} from "config/api";

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
	const [initialMessages, setInitialMessages] = useState([]);
	const { chatroomInfo, isExited } = route.params;
	const appState = useRef(AppState.currentState);
	const [memberId, setMemberId] = useState(null);
	const members = sortByIds(chatroomInfo.members);
	const otherMember = members.find((member) => member.id !== memberId);
	const flatListRef = useRef(null);
	const [bookmarkedCount, setBookmarkedCount] = useState(0);
	const { publishMessage, unsubscribeToChatroom } = useWebSocket();
	const { StatusBarManager } = NativeModules;
	const isAtBottomRef = useRef(true);
	const scrollOffsetRef = useRef(0);
	const [token, setToken] = useState(null);
	const [userLanguage, setUserLanguage] = useState(null);

	useEffect(() => {
		const fetchToken = async () => {
			const token = await getRefreshToken();
			setToken(token);
		};

		fetchToken();
	}, []);

	useEffect(() => {
		const fetchMyMemberId = async () => {
			const myMemberId = await getMyMemberId();
			setMemberId(myMemberId);
			const userLanguage = await getProfileById(myMemberId);
			setUserLanguage(userLanguage.data.settingLanguage);
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
			setTimeout(() => {
				flatListRef.current.scrollToEnd({ animated: false });
			}, 100);
		}
	};

	useFocusEffect(
		useCallback(() => {
			return async () => {
				await changeChatroomHold(chatroomInfo.id);
			};
		}, [chatroomInfo.id]),
	);

	useEffect(() => {
		const handleAppStateChange = async (nextAppState) => {
			if (
				appState.current === "active" &&
				(nextAppState === "background" || nextAppState === "inactive")
			) {
				await changeChatroomHold(chatroomInfo.id);
			}
			appState.current = nextAppState;
		};

		const subscription = AppState.addEventListener(
			"change",
			handleAppStateChange,
		);

		return () => {
			subscription.remove();
		};
	}, [chatroomInfo.id]);

	useEffect(() => {
		const fetchChatroomMessages = async () => {
			try {
				const response = await getChatsByChatroomId(chatroomInfo.id);
				const messages = response.data;
				setInitialMessages(messages);
			} catch (error) {
				console.error("Failed to fetch chatroom messages:", error);
				setInitialMessages([]);
			}
		};
		fetchChatroomMessages();
	}, []);

	const groupMessages = (messages) => {
		const grouped = [];
		let currentGroup = [];
		let currentDate = null;

		messages.forEach((msg, index) => {
			const messageDate = new Date(msg.created);

			if (!currentDate || !isSameDay(currentDate, messageDate)) {
				if (currentGroup.length > 0) {
					const lastMsg = {
						...currentGroup[currentGroup.length - 1],
						showTime: true,
					};
					grouped.push([...currentGroup.slice(0, -1), lastMsg]);
				}

				grouped.push([
					{
						id: `date-${messageDate.getTime()}`,
						isDateHeader: true,
						created: messageDate,
					},
				]);

				currentGroup = [msg];
				currentDate = messageDate;
			} else {
				const prevMsg = messages[index - 1];
				if (
					isSameMinute(msg.created, prevMsg.created) &&
					msg.member.id === prevMsg.member.id
				) {
					currentGroup.push(msg);
				} else {
					const lastMsg = {
						...currentGroup[currentGroup.length - 1],
						showTime: true,
					};
					grouped.push([...currentGroup.slice(0, -1), lastMsg]);
					currentGroup = [msg];
				}
			}
		});

		if (currentGroup.length) {
			const lastMsg = {
				...currentGroup[currentGroup.length - 1],
				showTime: true,
			};
			grouped.push([...currentGroup.slice(0, -1), lastMsg]);
		}

		return grouped;
	};

	const formatDateHeader = (date, userLanguage) => {
		const messageDate = new Date(date);

		const localeMap = {
			KO: "ko-KR",
			ES: "es-ES",
			EN: "en-US",
			JA: "ja-JP",
			ZH: "zh-CN",
		};
		const locale = localeMap[userLanguage] || "en-US";

		const formatter = new Intl.DateTimeFormat(locale, {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			weekday: "long",
		});

		return formatter.format(messageDate);
	};

	const isSameDay = (date1, date2) => {
		if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
			date1 = new Date(date1);
			date2 = new Date(date2);
		}

		return (
			date1.getUTCFullYear() === date2.getUTCFullYear() &&
			date1.getUTCMonth() === date2.getUTCMonth() &&
			date1.getUTCDate() === date2.getUTCDate()
		);
	};

	const isSameMinute = (date1, date2) => {
		if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
			date1 = new Date(date1);
			date2 = new Date(date2);
		}

		return (
			date1.getUTCFullYear() === date2.getUTCFullYear() &&
			date1.getUTCMonth() === date2.getUTCMonth() &&
			date1.getUTCDate() === date2.getUTCDate() &&
			date1.getUTCMinutes() === date2.getUTCMinutes()
		);
	};

	const toggleMenu = async () => {
		Keyboard.dismiss();
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
					text: t("exitChatroomButton"),
					onPress: async () => {
						await publishMessage({
							chatType: "EXIT",
							chatroomId: chatroomId,
							token,
						});
						await unsubscribeToChatroom(chatroomId, token);
						setTimeout(() => {
							navigation.navigate("Chat");
						}, 500);
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

	const data = useMemo(() => {
		const allMessages = [
			...(initialMessages || []),
			...(messages && messages[chatroomInfo.id]
				? messages[chatroomInfo.id]
				: []),
		];

		const uniqueMessages = Array.from(
			new Map(allMessages.map((msg) => [msg.id, msg])).values(),
		).sort((a, b) => new Date(a.created) - new Date(b.created));

		return groupMessages(uniqueMessages);
	}, [initialMessages, messages, chatroomInfo.id]);

	return (
		<>
			<SafeAreaView style={ChatRoomStyles.container}>
				<View style={ChatRoomStyles.containerTopBar}>
					<View style={ChatRoomStyles.containerBackName}>
						<TouchableOpacity
							style={ChatRoomStyles.iconArrow}
							onPress={() => {
								navigation.goBack();
							}}
						>
							<ArrowRight color="#000" />
						</TouchableOpacity>
						<Text style={ChatRoomStyles.textTopBar}>
							{otherMember.username}
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
						data={data}
						keyExtractor={(item) => item[0].id}
						renderItem={({ item }) => (
							<>
								{item[0].isDateHeader ? (
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
											{formatDateHeader(
												item[0].created,
												userLanguage,
											)}
										</Text>
									</View>
								) : (
									item.map((msg, idx) => (
										<ChatBubble
											key={msg.id}
											fileId={otherMember?.profileImg?.id}
											username={msg.member.username}
											message={msg.message}
											time={
												msg.showTime
													? formatTime(
															msg.created,
															userLanguage,
														)
													: ""
											}
											isMine={msg.member.id === memberId}
											isHeadMessage={idx === 0}
											chatroomId={msg.singleChatroom.id}
											chatId={msg.id}
										/>
									))
								)}
							</>
						)}
						onContentSizeChange={handleContentSizeChange}
						onScroll={handleScroll}
					/>
				</View>
			</SafeAreaView>
			<KeyboardAvoidingView
				style={{ marginBottom: 0 }}
				behavior="padding"
				keyboardVerticalOffset={statusBarHeight - 55}
				onContentSizeChange={handleContentSizeChange}
			>
				<ChatInputSend
					chatroomId={chatroomInfo.id}
					isExited={isExited}
					onFocus={handleInputFocus}
				/>
			</KeyboardAvoidingView>
			<View style={ChatRoomStyles.chatInput} />
			<View style={ChatRoomStyles.chatInputBottom} />
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
		</>
	);
};

export default ChatRoomPage;
