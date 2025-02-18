import React, { useEffect, useState, useCallback } from "react";
import {
	View,
	Text,
	TextInput,
	SafeAreaView,
	FlatList,
	Keyboard,
	TouchableOpacity,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";

import ChattingStyles from "@pages/chat/ChattingStyles";
import { getMyMemberId, getRefreshToken } from "util/secureStoreUtils";
import formatKoreanTime from "util/formatTime";
import { getChatroomSearch, getChatroomsByType } from "config/api";

import ConnectTop from "@components/connect/ConnectTop";
import ConnectSearchIcon from "@components/connect/ConnectSearchIcon";
import ConnectSearchCancel from "@components/connect/ConnectSearchCancel";
import IconBookmark from "@components/chat/IconBookmark";
import IconChatPlus from "@components/chat/IconChatPlus";
import ChatroomItem from "@components/chat/ChatroomItem";
import ArrowRight from "@components/common/ArrowRight";
import IconSearchFail from "@components/common/IconSearchFail";
import { useWebSocket } from "context/WebSocketContext";
import StatusIndicator from "./StatusIndicator";

const ChattingPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [myMemberId, setMyMemberId] = useState(null);
	const [searchChatRoomList, setSearchChatroomList] = useState([]);
	const [singleChatRoomList, setSingleChatRoomList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchData, setSearchData] = useState("");
	const [searchFail, setSearchFail] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const { messages, subscribeToNewChatroom } = useWebSocket();
	const [isIndividualTab, setIsIndividualTab] = useState(true);
	const [token, setToken] = useState(null);

	const showChatStatus = process.env.EXPO_PUBLIC_SHOW_CHAT_STATUS === "true";

	const handleSearch = async () => {
		try {
			const response = await getChatroomSearch(searchTerm);
			setSearchData(response.data);
			setSearchChatroomList(response.data);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"채팅 검색 오류:",
				error.response ? error.response.data : error.message,
			);
			setSearchFail(true);
		}
	};

	const handleSearchBack = () => {
		setSearchFail(false);
		setSearchData(null);
		setSearchTerm(null);
	};

	const handleFocus = () => {
		setIsSearching(true);
	};

	const handleBlur = () => {
		setIsSearching(false);
	};

	const handleCancel = () => {
		setSearchTerm("");
		setIsSearching(false);
		Keyboard.dismiss();
	};

	useEffect(() => {
		const fetchMyMemberId = async () => {
			const myMemberId = await getMyMemberId();
			setMyMemberId(myMemberId);

			const token = await getRefreshToken();
			setToken(token);
		};
		fetchMyMemberId();
	}, []);

	const fetchSingleChatroomList = useCallback(async () => {
		try {
			const response = await getChatroomsByType("SINGLE");

			const sortedChatrooms = response.data.sort((a, b) => {
				const timeA = new Date(a.lastChat.created);
				const timeB = new Date(b.lastChat.created);
				return timeB - timeA;
			});
			setSingleChatRoomList(sortedChatrooms);

			if (response.data.length === 0) {
				setIsIndividualTab(false);
			} else {
				setIsIndividualTab(true);
			}
		} catch (error) {
			console.error("Failed to fetch single chatrooms:", error);
		}
	}, [messages]);

	useFocusEffect(
		useCallback(() => {
			fetchSingleChatroomList();
		}, [messages]),
	);

	const onCompleteExit = () => {
		setTimeout(() => {
			fetchSingleChatroomList();
		}, 500);
	};

	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

	const data = searchData ? searchData : singleChatRoomList;

	const getLatestMessage = (chatroomId, content) => {
		if (!messages[chatroomId] || messages[chatroomId]?.length === 0) {
			subscribeToNewChatroom(chatroomId, token);
			return typeof content === "object" ? content.message : content;
		}

		const latestMessage =
			messages[chatroomId][messages[chatroomId].length - 1].message;
		return latestMessage || "";
	};

	const renderCommunity = () => (
		<View style={ChattingStyles.containerChatItems}>
			<View style={ChattingStyles.flatlist}>
				<FlatList
					keyExtractor={(item) => item.id}
					data={data}
					renderItem={({ item }) => (
						<ChatroomItem
							chatroomInfo={item}
							myMemberId={myMemberId}
							name={item.name || "Unknown"}
							content={getLatestMessage(
								item.id,
								item.lastChat.message,
							)}
							lastChatCreated={formatKoreanTime(
								item.lastChat.created,
							)}
							onCompleteExit={onCompleteExit}
							unreadChatsCount={item.unreadChatsCount}
						/>
					)}
					onEndReachedThreshold={0.1}
				/>
			</View>
		</View>
	);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={ChattingStyles.container}>
				<View style={ChattingStyles.backgroundBlue} />
				<View style={ChattingStyles.connectTop}>
					<ConnectTop />
				</View>
				{showChatStatus && <StatusIndicator />}
				<View
					style={[
						ChattingStyles.containerTextIcon,
						isSmallScreen && { top: -25 },
					]}
				>
					<Text style={ChattingStyles.textChattingTitle}>
						{t("chatTitle")}
					</Text>
					<IconBookmark
						style={ChattingStyles.iconBookmark}
						onPress={() => navigation.navigate("BookmarkPage")}
					/>
				</View>
				<View
					style={[
						ChattingStyles.containerSearch,
						isSmallScreen && { top: -25 },
					]}
				>
					<View style={ChattingStyles.containerSearchIcon}>
						<TextInput
							style={[
								ChattingStyles.search,
								(searchFail ||
									(searchData && searchData.length > 0)) && {
									paddingLeft: 40,
								},
							]}
							placeholder={t("searchPlaceholder")}
							value={searchTerm}
							onChangeText={setSearchTerm}
							onFocus={handleFocus}
							onBlur={handleBlur}
							onSubmitEditing={handleSearch}
						/>
						{(searchFail ||
							(searchData && searchData.length > 0)) && (
							<TouchableOpacity
								style={ChattingStyles.iconArrowRightSearch}
								onPress={handleSearchBack}
							>
								<ArrowRight color="#B0D0FF" />
							</TouchableOpacity>
						)}
						{isSearching ? (
							<ConnectSearchCancel
								style={ChattingStyles.searchIcon}
								onPress={handleCancel}
							/>
						) : (
							<ConnectSearchIcon
								style={ChattingStyles.searchIcon}
								onPress={handleSearch}
							/>
						)}
					</View>
				</View>
				<TouchableOpacity
					style={ChattingStyles.iconChatPlus}
					onPress={() => navigation.navigate("FriendListPage")}
				>
					<IconChatPlus />
				</TouchableOpacity>
				{isIndividualTab ? (
					<>{renderCommunity()}</>
				) : searchChatRoomList.length ? (
					searchFail ? (
						<View style={ChattingStyles.containerFail}>
							<IconSearchFail />
							<Text style={ChattingStyles.textFail}>
								{t("searchNoResults")}
							</Text>
						</View>
					) : searchData && searchData.length > 0 ? (
						<>{renderCommunity()}</>
					) : (
						<>{renderCommunity()}</>
					)
				) : (
					<View style={ChattingStyles.containerTextNoChat}>
						<Text style={ChattingStyles.textNoChat}>
							{t("noChatrooms")}
						</Text>
					</View>
				)}
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default ChattingPage;
