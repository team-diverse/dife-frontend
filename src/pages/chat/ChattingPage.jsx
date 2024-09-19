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
import { useWebSocket } from "context/WebSocketContext";
import { getMyMemberId } from "util/secureStoreUtils";
import formatKoreanTime from "util/formatTime";
import { getChatroomSearch } from "config/api";

import ConnectTop from "@components/connect/ConnectTop";
import ConnectSearchIcon from "@components/connect/ConnectSearchIcon";
import ConnectSearchCancel from "@components/connect/ConnectSearchCancel";
import IconBookmark from "@components/chat/IconBookmark";
import IconChatPlus from "@components/chat/IconChatPlus";
import ChatroomItem from "@components/chat/ChatroomItem";
import ArrowRight from "@components/common/ArrowRight";
import IconSearchFail from "@components/common/IconSearchFail";

const ChattingPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [myMemberId, setMyMemberId] = useState(null);
	const { chatrooms, messages, updateChatroomsAndMessages } = useWebSocket();

	const [searchTerm, setSearchTerm] = useState("");
	const [searchData, setSearchData] = useState(null);
	const [searchFail, setSearchFail] = useState(false);
	const [isSearching, setIsSearching] = useState(false);

	const getLatestChatByChatroomId = (id) => {
		const chats = messages[id] || [];
		return chats.length ? chats[chats.length - 1].message : "";
	};

	const [isIndividualTab] = useState(false);

	const handleSearch = async () => {
		try {
			const response = await getChatroomSearch(searchTerm);
			setSearchData(response.data);
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
		};
		fetchMyMemberId();
	}, []);

	useFocusEffect(
		useCallback(() => {
			updateChatroomsAndMessages();
		}, []),
	);

	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

	const data = searchData ? searchData : chatrooms;

	const renderCommunity = () => (
		<View style={ChattingStyles.containerChatItems}>
			<View style={ChattingStyles.flatlist}>
				<FlatList
					contentContainerStyle={ChattingStyles.flatlistContent}
					data={data}
					renderItem={({ item }) => (
						<ChatroomItem
							chatroomInfo={item}
							myMemberId={myMemberId}
							name={item.name}
							context={getLatestChatByChatroomId(item.id)}
							time={formatKoreanTime(item.created)}
						/>
					)}
					keyExtractor={(item) => item.id}
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
					<></>
				) : chatrooms.length ? (
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
