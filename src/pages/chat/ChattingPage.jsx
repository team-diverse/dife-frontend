import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	SafeAreaView,
	FlatList,
	Keyboard,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import ChattingStyles from "@pages/chat/ChattingStyles";

import ConnectTop from "@components/connect/ConnectTop";
import ConnectSearchIcon from "@components/connect/ConnectSearchIcon";
import ConnectSearchCancel from "@components/connect/ConnectSearchCancel";
import IconBookmark from "@components/chat/IconBookmark";
import IconChatPlus from "@components/chat/IconChatPlus";
import { useWebSocket } from "context/WebSocketContext";
import ChatroomItem from "@components/chat/ChatroomItem";
import formatKoreanTime from "util/formatTime";

const ChattingPage = () => {
	const navigation = useNavigation();

	const { chatrooms, messages } = useWebSocket();
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearching, setIsSearching] = useState(false);

	const getLatestChatByChatroomId = (id) => {
		const chats = messages[id] || [];
		return chats.length ? chats[chats.length - 1].message : "";
	};

	const [isIndividualTab, setIsIndividualTab] = useState(false);

	const handleSearch = () => {
		if (searchTerm.trim() !== "") {
			axios
				.get(`${searchTerm}`)
				.then(() => {})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
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

	const handleMoveOnetoone = () => {
		setIsIndividualTab(false);
	};

	const handleMoveGroup = () => {
		setIsIndividualTab(true);
	};

	return (
		<View style={ChattingStyles.container}>
			<View style={ChattingStyles.backgroundBlue} />
			<TouchableOpacity
				style={ChattingStyles.iconChatPlus}
				onPress={() => navigation.navigate("FriendListPage")}
			>
				<IconChatPlus />
			</TouchableOpacity>
			<SafeAreaView style={ChattingStyles.safeAreaView}>
				<View style={ChattingStyles.connectTop}>
					<ConnectTop />
				</View>
				<View style={ChattingStyles.containerTextIcon}>
					<Text style={ChattingStyles.textChattingTitle}>
						Chatting
					</Text>
					<IconBookmark
						style={ChattingStyles.iconBookmark}
						onPress={() => navigation.navigate("BookmarkPage")}
					/>
				</View>
				<View style={ChattingStyles.containerSearch}>
					<View style={ChattingStyles.containerSearchIcon}>
						<TextInput
							style={ChattingStyles.search}
							placeholder="검색"
							value={searchTerm}
							onChangeText={setSearchTerm}
							onFocus={handleFocus}
							onBlur={handleBlur}
						/>
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

				<View style={ChattingStyles.tabContainer}>
					<Text
						style={
							isIndividualTab
								? ChattingStyles.textTab
								: ChattingStyles.textActiveTab
						}
						onPress={handleMoveOnetoone}
					>
						1 : 1
					</Text>
					<Text
						style={
							isIndividualTab
								? ChattingStyles.textActiveTab
								: ChattingStyles.textTab
						}
						onPress={handleMoveGroup}
					>
						그룹
					</Text>
				</View>

				{isIndividualTab ? (
					<></>
				) : chatrooms.length ? (
					<View style={ChattingStyles.containerChatItems}>
						<View style={ChattingStyles.flatlist}>
							<FlatList
								contentContainerStyle={
									ChattingStyles.flatlistContent
								}
								data={chatrooms}
								renderItem={({ item }) => (
									<ChatroomItem
										chatroomInfo={item}
										name={item.name}
										context={getLatestChatByChatroomId(
											item.id,
										)}
										time={formatKoreanTime(item.created)}
									/>
								)}
								keyExtractor={(item) => item.id}
							/>
						</View>
					</View>
				) : (
					<View style={ChattingStyles.containerTextNoChat}>
						<Text style={ChattingStyles.textNoChat}>
							아직 채팅방이 없습니다.{"\n"}친구와 새로운 채팅을
							시작해보세요!
						</Text>
					</View>
				)}
			</SafeAreaView>
		</View>
	);
};

export default ChattingPage;
