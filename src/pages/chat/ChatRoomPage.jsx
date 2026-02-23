import React, {
	useState,
	useRef,
	useEffect,
	useMemo,
	useCallback,
} from "react";
import {
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
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import ChatRoomStyles from "@pages/chat/ChatRoomStyles";
import { useWebSocket } from "context/WebSocketContext";
import { useFocusEffect } from "@react-navigation/native";
import formatTime from "util/formatTime";
import { getMyMemberId, getRefreshToken } from "util/secureStoreUtils";
import { sortByIds } from "util/util";
import {
	getBookmarkedByChatroomId,
	getChatroomById,
	getProfileById,
	changeChatroomStatus,
	changeChatroomHold,
	chatSmallTalk,
} from "config/api";
import { useStatusBar } from "util/useStatusBar";

import ArrowRight from "@components/common/ArrowRight";
import ChatInputSend from "@components/chat/ChatInputSend";
import IconHamburgerMenu from "@components/chat/IconHamburgerMenu";
import IconChatProfile from "@components/chat/IconChatProfile";
import IconChatOut from "@components/chat/IconChatOut";
import ChatBubble from "@pages/chat/ChatBubble/ChatBubble";
import ModalSmallTalk from "@components/chat/ModalSmallTalk";

const ChatRoomPage = ({ route }) => {
	const { t } = useTranslation();
	const { StatusBarManager } = NativeModules;
	const {
		publishMessage,
		unsubscribeToChatroom,
		messages,
		fetchChatroomMessages,
		clearChatroomMessages,
		subscribeToNewChatroom,
	} = useWebSocket();
	const { chatroomInfo, isExited } = route.params;
	const appState = useRef(AppState.currentState);
	const flatListRef = useRef(null);
	const isAtBottomRef = useRef(true);
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const [memberId, setMemberId] = useState(null);

	const screenWidth = Dimensions.get("window").width;
	const menuAnim = useRef(new Animated.Value(screenWidth)).current;
	const members = sortByIds(chatroomInfo.members);
	const otherMember = members.find((member) => member.id !== memberId);
	const menuWidth = 259;
	const modalTop = 8;
	const BannerHeight = 56;

	const [menuOpen, setMenuOpen] = useState(false);
	const [bookmarkedCount, setBookmarkedCount] = useState(0);
	const [token, setToken] = useState(null);
	const [userLanguage, setUserLanguage] = useState(null);
	const [showSmallTalk, setShowSmallTalk] = useState(true);
	const [smallTalkSubject, setSmallTalkSubject] = useState(null);
	const [smallTalkHeight, setSmallTalkHeight] = useState(BannerHeight);
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
	const getChatroomStatusValue = useCallback((chatroom) => {
		return String(
			chatroom?.status ??
				chatroom?.chatroomStatus ??
				chatroom?.chatroom_status ??
				"",
		).toUpperCase();
	}, []);
	const initialIsExitedRoom = useMemo(() => {
		const status = getChatroomStatusValue(chatroomInfo);
		return Boolean(isExited) || status === "EXITED";
	}, [chatroomInfo, getChatroomStatusValue, isExited]);
	const [isExitedRoom, setIsExitedRoom] = useState(initialIsExitedRoom);
	const subscribeRef = useRef(subscribeToNewChatroom);
	const fetchRef = useRef(fetchChatroomMessages);
	const clearRef = useRef(clearChatroomMessages);
	const messagesRef = useRef(messages);
	const isExitedRoomRef = useRef(initialIsExitedRoom);

	useStatusBar({
		color: "#D9EAFF",
		barStyle: "dark-content",
	});

	useEffect(() => {
		subscribeRef.current = subscribeToNewChatroom;
	}, [subscribeToNewChatroom]);

	useEffect(() => {
		fetchRef.current = fetchChatroomMessages;
	}, [fetchChatroomMessages]);

	useEffect(() => {
		clearRef.current = clearChatroomMessages;
	}, [clearChatroomMessages]);

	useEffect(() => {
		messagesRef.current = messages;
	}, [messages]);

	useEffect(() => {
		setIsExitedRoom(initialIsExitedRoom);
	}, [initialIsExitedRoom, chatroomInfo.id]);

	useEffect(() => {
		isExitedRoomRef.current = isExitedRoom;
	}, [isExitedRoom]);

	useEffect(() => {
		const fetchSmallTalk = async () => {
			const smallTalk = await chatSmallTalk(chatroomInfo.id);
			setSmallTalkSubject(smallTalk.data.content);
		};
		fetchSmallTalk();
	}, [chatroomInfo.id]);

	useEffect(() => {
		const fetchToken = async () => {
			const token = await getRefreshToken();
			setToken(token);
		};
		fetchToken();
	}, []);

	useEffect(() => {
		if (Platform.OS !== "android") {
			return undefined;
		}
		const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
			setIsKeyboardVisible(true);
		});
		const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
			setIsKeyboardVisible(false);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
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
		if (Platform.OS === "ios") {
			StatusBarManager.getHeight((statusBarFrameData) => {
				setStatusBarHeight(statusBarFrameData.height);
			});
		}
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
		if (isAtBottomRef.current && flatListRef.current) {
			setTimeout(() => {
				flatListRef.current.scrollToEnd({ animated: false });
			}, 50);
		}
	};

	useFocusEffect(
		useCallback(() => {
			return async () => {
				await changeChatroomHold(chatroomInfo.id);
			};
		}, [chatroomInfo.id]),
	);

	useFocusEffect(
		useCallback(() => {
			const fetchMessages = async () => {
				try {
					const chatroomResponse = await getChatroomById(
						chatroomInfo.id,
					);
					const status = getChatroomStatusValue(
						chatroomResponse?.data,
					);
					if (status === "EXITED" || isExitedRoomRef.current) {
						setIsExitedRoom(true);
						clearRef.current(chatroomInfo.id);
						return;
					}
					setIsExitedRoom(false);
					await subscribeRef.current(chatroomInfo.id);
					const hasCachedMessages =
						(messagesRef.current?.[chatroomInfo.id] || []).length >
						0;
					if (!hasCachedMessages) {
						await fetchRef.current(chatroomInfo.id);
					}
				} catch (error) {
					const statusCode = error?.response?.status;
					if (statusCode === 400 || statusCode === 403) {
						setIsExitedRoom(true);
						clearRef.current(chatroomInfo.id);
						return;
					}
					console.error("Failed to fetch chatroom messages:", error);
				}
			};
			fetchMessages();
		}, [chatroomInfo.id, getChatroomStatusValue]),
	);

	const handleEnteredChatroom = useCallback(async () => {
		clearRef.current(chatroomInfo.id);

		for (let retry = 0; retry < 6; retry += 1) {
			try {
				try {
					await changeChatroomStatus(chatroomInfo.id);
				} catch (statusError) {
					const statusCode = statusError?.response?.status;
					if (
						statusCode &&
						statusCode !== 400 &&
						statusCode !== 409
					) {
						throw statusError;
					}
				}

				const chatroomResponse = await getChatroomById(chatroomInfo.id);
				const status = getChatroomStatusValue(chatroomResponse?.data);
				if (status === "EXITED") {
					throw new Error("chatroom still exited");
				}

				await subscribeRef.current(chatroomInfo.id);
				setIsExitedRoom(false);
				return true;
			} catch (error) {
				if (retry === 5) {
					console.error("Failed to re-enter chatroom:", error);
					setIsExitedRoom(true);
					return false;
				} else {
					await new Promise((resolve) => setTimeout(resolve, 300));
				}
			}
		}
		return false;
	}, [chatroomInfo.id, getChatroomStatusValue]);

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
						clearRef.current(chatroomId);
						setIsExitedRoom(true);
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

	const handleSmallTalkLayout = useCallback((event) => {
		const { height } = event.nativeEvent.layout;
		setSmallTalkHeight((prev) => (prev === height ? prev : height));
	}, []);

	const getCreatedVariants = useCallback((created) => {
		if (!created) return { epochSec: "", compact: "", utcCompact: "" };
		const parsed = new Date(created);
		const epochSec = Number.isNaN(parsed.getTime())
			? ""
			: String(Math.floor(parsed.getTime() / 1000));
		const utcCompact = Number.isNaN(parsed.getTime())
			? ""
			: parsed.toISOString().slice(0, 19);
		const compact = String(created)
			.trim()
			.replace(/(\.\d{3})\d+/, "$1")
			.replace(/\.\d+/, "")
			.replace(/Z$/i, "")
			.replace(/[+-]\d{2}:?\d{2}$/, "")
			.slice(0, 19);
		return { epochSec, compact, utcCompact };
	}, []);

	const getMessageKeys = useCallback(
		(msg) => {
			const keys = [];
			if (msg?.key) keys.push(`key:${String(msg.key)}`);
			if (msg?.id !== undefined && msg?.id !== null) {
				keys.push(`id:${String(msg.id)}`);
			}
			const msgMemberId =
				msg?.member?.id ?? msg?.memberId ?? msg?.member_id ?? "unknown";
			const content = (msg?.message ?? msg?.content ?? "").trim();
			const rawCreated = String(msg?.created ?? "").trim();
			const { epochSec, compact, utcCompact } = getCreatedVariants(
				msg?.created,
			);
			if (epochSec)
				keys.push(`fb-epoch:${msgMemberId}-${epochSec}-${content}`);
			if (compact)
				keys.push(`fb-compact:${msgMemberId}-${compact}-${content}`);
			if (utcCompact)
				keys.push(`fb-utc:${msgMemberId}-${utcCompact}-${content}`);
			if (rawCreated) keys.push(`fb-raw:${rawCreated}-${content}`);
			return keys;
		},
		[getCreatedVariants],
	);

	const dedupeMessages = useCallback(
		(list) => {
			const seen = new Set();
			const result = [];
			list.forEach((msg) => {
				const keys = getMessageKeys(msg);
				const hasDuplicate = keys.some((key) => seen.has(key));
				if (hasDuplicate) return;
				keys.forEach((key) => seen.add(key));
				result.push(msg);
			});
			return result;
		},
		[getMessageKeys],
	);

	const data = useMemo(() => {
		const allMessages =
			messages && messages[chatroomInfo.id]
				? messages[chatroomInfo.id]
				: [];

		const uniqueMessages = dedupeMessages(allMessages).sort(
			(a, b) => new Date(a.created) - new Date(b.created),
		);

		return groupMessages(uniqueMessages);
	}, [messages, chatroomInfo.id, dedupeMessages]);

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
							{otherMember?.username ??
								chatroomInfo?.name ??
								"Unknown"}
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
					<ModalSmallTalk
						visible={showSmallTalk}
						onClose={() => setShowSmallTalk(false)}
						style={{ top: modalTop }}
						subject={smallTalkSubject}
						onLayout={handleSmallTalkLayout}
					/>
					<FlatList
						ref={flatListRef}
						data={data}
						keyExtractor={(item, index) => {
							const first = item?.[0];
							if (first?.isDateHeader) {
								return `date-${String(first.id)}-${index}`;
							}
							const memberKey =
								first?.member?.id ??
								first?.memberId ??
								first?.member_id ??
								"unknown";
							const createdKey = String(first?.created ?? "");
							const idKey = String(
								first?.key ?? first?.id ?? "no-id",
							);
							return `group-${index}-${idKey}-${memberKey}-${createdKey}`;
						}}
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
									item.map((msg, idx) => {
										const msgMemberId =
											msg?.member?.id ??
											msg?.memberId ??
											msg?.member_id;
										const msgUsername =
											msg?.member?.username ??
											otherMember?.username ??
											"Unknown";
										return (
											<ChatBubble
												key={[
													msg?.key ??
														msg?.id ??
														"no-id",
													msgMemberId ?? "unknown",
													String(msg?.created ?? ""),
													idx,
												].join("|")}
												fileId={
													otherMember?.profileImg?.id
												}
												username={msgUsername}
												message={msg.message}
												time={
													msg.showTime
														? formatTime(
																msg.created,
																userLanguage,
															)
														: ""
												}
												isMine={
													String(msgMemberId) ===
													String(memberId)
												}
												isHeadMessage={idx === 0}
												chatroomId={
													msg.singleChatroom?.id ??
													chatroomInfo.id
												}
												chatId={msg.id}
											/>
										);
									})
								)}
							</>
						)}
						onContentSizeChange={handleContentSizeChange}
						onScroll={handleScroll}
						scrollEventThrottle={16}
						contentContainerStyle={{
							paddingTop: showSmallTalk
								? modalTop + smallTalkHeight + 8
								: 0,
						}}
					/>
				</View>
			</SafeAreaView>
			<KeyboardAvoidingView
				style={{ marginBottom: 0 }}
				behavior={Platform.OS === "ios" ? "padding" : "position"}
				enabled={Platform.OS === "ios" || isKeyboardVisible}
				keyboardVerticalOffset={
					Platform.OS === "ios" ? statusBarHeight - 55 : 0
				}
				onContentSizeChange={handleContentSizeChange}
			>
				<ChatInputSend
					chatroomId={chatroomInfo.id}
					isExited={isExitedRoom}
					onFocus={handleInputFocus}
					onEntered={handleEnteredChatroom}
				/>
			</KeyboardAvoidingView>
			<View
				style={{
					paddingBottom: insets.bottom,
					backgroundColor: "white",
				}}
			/>
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
