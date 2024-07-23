import React, { useState, useRef, useEffect } from "react";
import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	Keyboard,
	TouchableWithoutFeedback,
	Animated,
	Dimensions,
	FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ChatRoomStyles from "@pages/chat/ChatRoomStyles";

import ArrowRight from "@components/common/ArrowRight";
import ChatInputSend from "@components/chat/ChatInputSend";
import IconHamburgerMenu from "@components/chat/IconHamburgerMenu";
import IconChatProfile from "@components/chat/IconChatProfile";
import IconChatOut from "@components/chat/IconChatOut";
import IconChatNotification from "@components/chat/IconChatNotification";
import IconChatSetting from "@components/chat/IconChatSetting";
import ChatBubble from "./ChatBubble/ChatBubble";
import { useWebSocket } from "context/WebSocketContext";
import formatKoreanTime from "util/formatTime";
import * as SecureStore from "expo-secure-store";

const ChatRoomPage = ({ route }) => {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const [menuOpen, setMenuOpen] = useState(false);
	const menuWidth = 259;
	const screenWidth = Dimensions.get("window").width;
	const menuAnim = useRef(new Animated.Value(screenWidth)).current;
	const { messages } = useWebSocket();
	const { chatroomInfo } = route.params;
	const [memberId, setMemberId] = useState(null);
	const flatListRef = useRef(null);

	useEffect(() => {
		const getMemberId = async () => {
			const id = await SecureStore.getItemAsync("memberId");
			setMemberId(parseInt(id));
		};
		getMemberId();
	}, []);

	useEffect(() => {
		if (flatListRef.current) {
			flatListRef.current.scrollToEnd({ animated: true });
		}
	}, [messages]);

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

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleGoBack = () => {
		navigation.goBack();
	};

	const toggleMenu = () => {
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
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
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
											url={null}
											username={msg.member.username}
											message={msg.message}
											time={formatKoreanTime(msg.created)}
											isMine={msg.member.id === memberId}
											isHeadMessage={idx === 0}
										/>
									);
								})}
							</>
						)}
					/>
				</View>
				<ChatInputSend
					chatroomId={chatroomInfo.id}
					memberId={memberId}
				/>
				{menuOpen && (
					<TouchableOpacity
						onPress={toggleMenu}
						style={[
							ChatRoomStyles.menuBackground,
							{ top: insets.top },
						]}
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
						<IconChatOut />
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
							참가자
						</Text>
						<View style={ChatRoomStyles.containerChatPeople}>
							<IconChatProfile size="36" />
							<Text style={ChatRoomStyles.textChatPeople}>
								나
							</Text>
						</View>
						<View style={ChatRoomStyles.containerChatPeople}>
							<IconChatProfile size="36" />
							<Text style={ChatRoomStyles.textChatPeople}>
								Name
							</Text>
						</View>
					</View>
					<View style={ChatRoomStyles.line} />
					<TouchableOpacity style={ChatRoomStyles.containerDrawer}>
						<View style={ChatRoomStyles.containerDrawerTextCount}>
							<Text style={ChatRoomStyles.textDrawer}>
								스크랩 보관함
							</Text>
							<View style={ChatRoomStyles.containerDrawerCount}>
								<Text style={ChatRoomStyles.textDrawerCount}>
									3
								</Text>
							</View>
						</View>
						<View style={ChatRoomStyles.iconReverseArrow}>
							<ArrowRight color="#000" />
						</View>
					</TouchableOpacity>
					<View style={ChatRoomStyles.line} />
					<TouchableOpacity style={ChatRoomStyles.containerDrawer}>
						<View style={ChatRoomStyles.containerDrawerTextCount}>
							<Text style={ChatRoomStyles.textDrawer}>앨범</Text>
							<View style={ChatRoomStyles.containerDrawerCount}>
								<Text style={ChatRoomStyles.textDrawerCount}>
									3
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
		</TouchableWithoutFeedback>
	);
};

export default ChatRoomPage;
