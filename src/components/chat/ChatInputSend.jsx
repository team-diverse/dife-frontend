import React, { useState, useEffect } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Keyboard,
	Platform,
} from "react-native";

import { CustomTheme } from "@styles/CustomTheme";
import { useWebSocket } from "context/WebSocketContext";
import { getRefreshToken } from "util/secureStoreUtils";

import IconChatSend from "@components/chat/IconChatSend";

const { fontBody14 } = CustomTheme;

const ChatInputSend = ({ chatroomId, isExited: initialIsExited, onFocus }) => {
	const [chatInput, setChatInput] = useState("");
	const { publishMessage } = useWebSocket();
	const [token, setToken] = useState(null);
	const [isExited, setIsExited] = useState(initialIsExited);

	useEffect(() => {
		const fetchToken = async () => {
			const token = await getRefreshToken();
			setToken(token);
		};

		fetchToken();
	}, []);

	const handleSend = async () => {
		const trimmedChatInput = chatInput.trim();
		if (trimmedChatInput && token) {
			if (isExited) {
				publishMessage({
					chatType: "ENTER",
					chatroomId,
					message: trimmedChatInput,
					token,
				});
				setIsExited(false);
			} else {
				publishMessage({
					chatType: "CHAT",
					chatroomId,
					message: trimmedChatInput,
					token,
				});
			}
			setChatInput("");
		} else {
			console.log("Token is missing or input is empty");
		}
	};

	return (
		<View style={styles.rectangle}>
			<TextInput
				style={styles.input}
				value={chatInput}
				onChangeText={setChatInput}
				multiline
				onFocus={onFocus}
				onBlur={Keyboard.dismiss}
				onContentSizeChange={(contentHeight) => {
					if (contentHeight <= 6 * 17) {
						contentHeight;
					} else {
						6 * 17;
					}
				}}
			/>

			<TouchableOpacity style={styles.rectangleBlue} onPress={handleSend}>
				<IconChatSend />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		flexDirection: "row",
		width: "100%",
		alignItems: "flex-start",
		justifyContent: "space-between",
		backgroundColor: CustomTheme.bgBasic,
		...Platform.select({
			ios: {
				shadowColor: "#3C454E",
				shadowOffset: { width: 0, height: -4 },
				shadowOpacity: 0.05,
				shadowRadius: 3,
			},
			android: {
				elevation: 3,
			},
		}),
	},
	iconImage: {
		alignItems: "center",
		marginLeft: 12,
	},
	rectangleImage: {
		width: "100%",
		height: 288,
		backgroundColor: CustomTheme.bgBasic,
	},
	containerIconCircle: {
		flexDirection: "row",
		justifyContent: "center",
		marginVertical: 105,
	},
	textIconCircle: {
		...fontBody14,
		marginTop: 12,
	},
	iconCircleCamera: {
		alignItems: "center",
	},
	iconCircleGallery: {
		alignItems: "center",
		marginLeft: 64,
	},
	input: {
		flex: 7,
		...fontBody14,
		alignItems: "center",
		width: "100%",
		marginTop: 10,
		marginBottom: 13,
		marginRight: 55,
		paddingLeft: 17,
		paddingRight: 17,
		maxHeight: 6 * 17,
	},
	rectangleBlue: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 47.65,
		height: 48,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.primaryMedium,
	},
});

export default ChatInputSend;
