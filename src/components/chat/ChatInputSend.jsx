import React, { useState, useEffect } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Keyboard,
} from "react-native";

import { CustomTheme } from "@styles/CustomTheme";

import IconChatSend from "@components/chat/IconChatSend";
import { useWebSocket } from "context/WebSocketContext";
import { getRefreshToken } from "util/secureStoreUtils";

const { fontBody14 } = CustomTheme;

const ChatInputSend = ({ chatroomId, onFocus }) => {
	const [chatInput, setChatInput] = useState("");
	const { publishMessage } = useWebSocket();
	const [token, setToken] = useState(null);

	useEffect(() => {
		const fetchToken = async () => {
			const token = await getRefreshToken();
			setToken(token);
		};

		fetchToken();
	}, []);

	const handleSend = () => {
		const trimmedChatInput = chatInput.trim();
		if (trimmedChatInput && token) {
			publishMessage({
				chatType: "CHAT",
				chatroomId,
				message: trimmedChatInput,
				token,
			});
			setChatInput("");
		} else {
			console.log("Token is missing or input is empty");
		}
	};

	return (
		<View style={styles.rectangle}>
			<TextInput
				style={[styles.input, { paddingLeft: 17 }]}
				value={chatInput}
				onChangeText={setChatInput}
				onFocus={onFocus}
				onBlur={Keyboard.dismiss}
				placeholder="Type a message..."
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
		height: 48,
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: CustomTheme.bgBasic,
		shadowColor: "#3C454E",
		shadowOffset: { width: 0, height: -4 },
		shadowOpacity: 0.05,
		shadowRadius: 3,
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
		height: 36,
	},
	rectangleBlue: {
		flex: 1,
		width: 47.65,
		height: 48,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.primaryMedium,
	},
});

export default ChatInputSend;
