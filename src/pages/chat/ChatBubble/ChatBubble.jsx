import React, { useState, useRef } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import ChatBubbleRightTrailSVG from "./ChatBubbleRightTrailSVG";
import ChatBubbleLeftTrailSVG from "./ChatBubbleLeftTrailSVG";
import IconChatProfile from "@components/chat/IconChatProfile";
import ModalMenuChat from "@components/chat/ModalMenuChat";

const ChatBubble = ({
	profileImageName,
	username,
	message,
	time,
	isMine,
	isHeadMessage,
	chatroomId,
	chatId,
}) => {
	const bubbleRef = useRef();

	const [modalVisible, setModalVisible] = useState(false);
	const [modalPosition, setModalPosition] = useState(null);

	const handleLongPress = () => {
		setModalVisible(true);
		if (bubbleRef.current) {
			bubbleRef.current.measureInWindow((x, y, width, height) => {
				setModalPosition({ x, y, width, height });
			});
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
							<IconChatProfile
								size={36}
								imageName={profileImageName}
							/>
						</View>
					</View>
				)}
				<View>
					{showProfile && (
						<View>
							<Text style={styles.profileName}>{username}</Text>
						</View>
					)}
					<TouchableOpacity onLongPress={handleLongPress}>
						<View
							style={[
								frameParentStyles,
								!isHeadMessage && { marginLeft: 50 },
							]}
							ref={bubbleRef}
						>
							<View style={styles.timeWrapper}>
								<Text style={styles.time}>{time}</Text>
							</View>
							<View style={bubbleStyles}>
								<Text style={messageStyles}>{message}</Text>
							</View>
							<View>{TrailSVG}</View>
						</View>
					</TouchableOpacity>
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
		marginRight: 10,
	},
	profileName: {
		fontSize: 12,
		lineHeight: 16,
		marginBottom: 5,
	},
	timeWrapper: {
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
		fontSize: 14,
		lineHeight: 20,
		textAlign: "left",
		fontFamily: "Noto Sans CJK KR",
	},
	myMessage: {
		color: "#fff",
	},
	otherMessage: {
		color: "#1B1C1E",
	},
	bubble: {
		overflow: "hidden",
		paddingTop: 7,
		paddingBottom: 8,
		maxWidth: 180,
		alignItems: "center",
		flexDirection: "row",
	},
	myBubble: {
		paddingLeft: 12,
		justifyContent: "flex-end",
		borderTopLeftRadius: 12,
		borderBottomLeftRadius: 12,
		backgroundColor: "#2964e0",
	},
	otherBubble: {
		paddingRight: 12,
		justifyContent: "flex-start",
		borderTopRightRadius: 12,
		borderBottomRightRadius: 12,
		backgroundColor: "#EDEEF2",
	},
	unionIcon: {
		width: 12,
		height: 35,
	},
	frameParent: {
		marginLeft: 2,
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
