import React, { useState, useRef, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";
import * as Sentry from "@sentry/react-native";

import { CustomTheme } from "@styles/CustomTheme";
import { getMyProfile, translationByChatId } from "config/api";

import ChatBubbleRightTrailSVG from "./ChatBubbleRightTrailSVG";
import ChatBubbleLeftTrailSVG from "./ChatBubbleLeftTrailSVG";
import IconChatProfile from "@components/chat/IconChatProfile";
import ModalMenuChat from "@components/chat/ModalMenuChat";
import ModalTranslationsCount from "@components/common/ModalTranslationsCount";
import LoadingDots from "@components/common/loading/LoadingDots";

const { fontNavi } = CustomTheme;

const ChatBubble = ({
	fileId,
	username,
	message,
	time,
	isMine,
	isHeadMessage,
	chatroomId,
	chatId,
	handleChatBubblePosition,
	handleChatBubble2Position,
}) => {
	const { t } = useTranslation();

	const bubbleRef = useRef();
	const bubbleRef2 = useRef();

	const [modalVisible, setModalVisible] = useState(false);
	const [modalPosition, setModalPosition] = useState(null);
	const [isTranslation, setIsTranslation] = useState(false);
	const [translationCount, setTranslationCount] = useState();
	const [modalTranslationVisible, setModalTranslationVisible] =
		useState(false);
	const [chatMessage, setChatMessage] = useState(message);
	const [translating, setTranslating] = useState(false);

	useEffect(() => {
		const measurePosition = () => {
			if (isMine === false) {
				if (bubbleRef.current) {
					bubbleRef.current.measureInWindow((x, y, width, height) => {
						if (handleChatBubblePosition) {
							handleChatBubblePosition({ x, y, width, height });
						}
					});
					if (bubbleRef2.current) {
						bubbleRef2.current.measureInWindow(
							(x, y, width, height) => {
								if (handleChatBubble2Position) {
									handleChatBubble2Position({
										x,
										y,
										width,
										height,
									});
								}
							},
						);
					}
				}
			}
		};
		setTimeout(measurePosition, 50);
	}, []);

	const handleLongPress = () => {
		Haptics.selectionAsync();
		setModalVisible(true);
		if (bubbleRef.current) {
			bubbleRef.current.measureInWindow((x, y, width, height) => {
				setModalPosition({ x, y, width, height });
			});
		}
	};

	const handleTranslations = async () => {
		try {
			const responseCount = await getMyProfile();
			const count =
				responseCount.data.translationCount === 0
					? 0
					: responseCount.data.translationCount + 1;
			setTranslationCount(count);

			if (!isTranslation) {
				if (translationCount === 0) {
					setModalTranslationVisible(true);
					setIsTranslation(true);
					setTranslating(true);
					const response = await translationByChatId(chatId);
					setChatMessage(response.data.translations[0].text);
					setTranslating(false);
				} else if (translationCount <= 15) {
					setModalTranslationVisible(false);
					setIsTranslation(true);
					setTranslating(true);
					const response = await translationByChatId(chatId);
					setChatMessage(response.data.translations[0].text);
					setTranslating(false);
				} else if (translationCount > 15) {
					setModalTranslationVisible(true);
				}
			} else {
				setIsTranslation(false);
			}
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"채팅 번역 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const rowStyles = [styles.row, isMine ? styles.myRow : styles.otherRow];
	const bubbleStyles = [
		styles.bubble,
		isMine ? styles.myBubble : styles.otherBubble,
	];
	const messageStyles = [
		styles.message,
		isMine ? styles.myMessage : styles.otherMessage,
	];
	const frameParentStyles = [
		styles.frameParent,
		isMine ? styles.myFrameParent : styles.otherFrameParent,
	];
	const TrailSVG = isMine ? (
		<ChatBubbleRightTrailSVG />
	) : (
		<ChatBubbleLeftTrailSVG />
	);
	const showProfile = !isMine && isHeadMessage;

	return (
		<View style={rowStyles}>
			<View style={styles.profileChatWrapper}>
				{showProfile && (
					<View style={styles.profileWrapper}>
						<View style={styles.iconChatProfileWrapper}>
							<IconChatProfile size={36} fileId={fileId} />
						</View>
					</View>
				)}
				<View>
					{showProfile && (
						<View>
							<Text style={styles.profileName}>{username}</Text>
						</View>
					)}
					<View
						style={[
							frameParentStyles,
							!isHeadMessage && { marginLeft: 45 },
						]}
					>
						<View style={styles.timeWrapper}>
							{time ? (
								<Text style={styles.time}>{time}</Text>
							) : null}
							{!isMine && (
								<TouchableOpacity onPress={handleTranslations}>
									<Text
										style={styles.textTranslation}
										ref={bubbleRef2}
									>
										{isTranslation
											? t("viewOriginalButton")
											: t("translateButton")}
									</Text>
								</TouchableOpacity>
							)}
						</View>
						{translating ? (
							<View
								style={[
									bubbleStyles,
									{
										height: 35,
									},
								]}
							>
								<View
									style={[
										bubbleStyles,
										{ left: 2, bottom: -5 },
									]}
								>
									<LoadingDots />
								</View>
							</View>
						) : (
							<TouchableOpacity
								activeOpacity={1}
								style={bubbleStyles}
								onLongPress={handleLongPress}
							>
								<Text
									style={[messageStyles, styles.absoluteText]}
									ref={bubbleRef}
								>
									{isTranslation ? chatMessage : message}
								</Text>
							</TouchableOpacity>
						)}
						<View
							style={[
								styles.trailContainer,
								styles.underlay,
								!isMine && styles.otherUserTrail,
								!isMine && styles.trailOtherContainer,
							]}
						>
							{TrailSVG}
						</View>
					</View>
					<ModalTranslationsCount
						modalVisible={modalTranslationVisible}
						setModalVisible={setModalTranslationVisible}
						translationCount={translationCount}
					/>
					{modalVisible && modalPosition && (
						<ModalMenuChat
							modalVisible={modalVisible}
							setModalVisible={setModalVisible}
							position={modalPosition}
							isMine={isMine}
							chatroomId={chatroomId}
							chatId={chatId}
							clipboardContent={message}
						/>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	profileChatWrapper: {
		flexDirection: "row",
	},
	iconChatProfileWrapper: {
		paddingBottom: 10,
	},
	profileWrapper: {
		marginBottom: 10,
		marginRight: 15,
	},
	profileName: {
		fontSize: 12,
		lineHeight: 16,
		marginLeft: -5,
		marginBottom: 5,
	},
	textTranslation: {
		...fontNavi,
		color: CustomTheme.primaryMedium,
		textDecorationLine: "underline",
		marginLeft: 6,
	},
	timeWrapper: {
		flexDirection: "row",
		marginTop: "auto",
	},
	time: {
		fontSize: 8,
		lineHeight: 11,
		color: "#8c8d91",
		textAlign: "center",
		display: "flex",
		justifyContent: "center",
		width: 40,
		height: 15,
		alignItems: "center",
		fontFamily: "Noto Sans CJK KR",
	},
	message: {
		fontSize: 15,
		lineHeight: 20,
		textAlign: "left",
		fontFamily: "Noto Sans CJK KR",
		flexWrap: "wrap",
		maxWidth: "100%",
	},
	myMessage: {
		color: "#fff",
	},
	otherMessage: {
		color: "#1B1C1E",
	},
	absoluteText: {
		position: "realative",
		zIndex: 1,
	},

	underlay: {
		zIndex: 0,
		position: "relative",
		bottom: 0,
		left: -10,
	},

	otherUserTrail: {
		zIndex: 0,
		position: "absolute",
		top: 0,
		left: -7,
	},

	trailOtherContainer: {
		zIndex: 0,
		position: "absolute",
		alignItems: "auto",
		marginLeft: 4,
		marginRight: 2,
		paddingVertical: 0,
		paddingBottom: 2,
	},

	trailContainer: {
		zIndex: 0,
		position: "relative",
		marginTop: "auto",
		alignItems: "flex-end",
		marginLeft: -2,
		marginRight: 2,
		paddingVertical: 0,
		paddingBottom: 2,
	},
	bubble: {
		zIndex: 1,
		paddingTop: 7,
		paddingBottom: 8,
		paddingRight: 8,
		paddingLeft: 8,
		maxWidth: 200,
		backgroundColor: "#FBFBFB",
		marginBottom: 2,
	},
	myBubble: {
		zIndex: 1,
		backgroundColor: "#2964e0",
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
	},
	otherBubble: {
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
		backgroundColor: "#FBFBFB",
		marginLeft: -4,
	},
	unionIcon: {
		width: 12,
		height: 35,
	},
	frameParent: {
		marginLeft: -5,
		flexDirection: "row",
	},
	myFrameParent: {
		justifyContent: "flex-end",
	},
	otherFrameParent: {
		flexDirection: "row-reverse",
	},
	row: {
		flex: 1,
		marginBottom: 5,
	},
	myRow: {
		marginLeft: "auto",
		justifyContent: "flex-end",
	},
	otherRow: {
		marginRight: "auto",
		justifyContent: "flex-start",
	},
});

export default ChatBubble;
