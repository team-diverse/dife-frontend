import React, { useState, useEffect } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from "react-native";

import { CustomTheme } from "@styles/CustomTheme";

import IconChatSend from "@components/chat/IconChatSend";
import { useWebSocket } from "context/WebSocketContext";
import * as SecureStore from "expo-secure-store";

const { fontBody14 } = CustomTheme;

const ChatInputSend = ({ chatroomId, memberId }) => {
	const [chatInput, setChatInput] = useState("");
	const [plusClick, setPlusClick] = useState(false);
	const { publishMessage } = useWebSocket();
	const [token, setToken] = useState(null); 

	useEffect(() => {
		const fetchToken = async () => {
			const retrievedToken = await SecureStore.getItemAsync("refreshToken");
			setToken(retrievedToken);
		};

		fetchToken();
	}, []);

	const handleInputFocus = () => {
		if (plusClick) {
			setPlusClick(false);
		}
	};

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
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<View style={styles.rectangle}>
				<TextInput
					style={[styles.input, { paddingLeft: 17 }]}
					value={chatInput}
					onChangeText={setChatInput}
					onFocus={handleInputFocus}
				/>
				<TouchableOpacity
					style={styles.rectangleBlue}
					onPress={handleSend}
				>
					<IconChatSend />
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
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