import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
} from "react-native";

import { CustomTheme } from "@styles/CustomTheme";

import IconImagePlus from "@components/chat/IconImagePlus";
import IconImageExit from "@components/chat/IconImageExit";
import IconChatSend from "@components/chat/IconChatSend";
import IconCircleCamera from "@components/chat/IconCircleCamera";
import IconCircleGallery from "@components/chat/IconCircleGallery";
import { useWebSocket } from "context/WebSocketContext";

const { fontBody14 } = CustomTheme;

const ChatInputSend = ({ chatroomId, memberId }) => {
	const [chatInput, setChatInput] = useState("");
	const [plusClick, setPlusClick] = useState(false);
	const { publishMessage } = useWebSocket();

	const handleClick = () => {
		setPlusClick(!plusClick);
		Keyboard.dismiss();
	};

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleInputFocus = () => {
		if (plusClick) {
			setPlusClick(false);
		}
	};

	const handleSend = () => {
		const trimmedChatInput = chatInput.trim();
		if (trimmedChatInput) {
			publishMessage({
				chatType: "CHAT",
				chatroomId,
				memberId,
				message: trimmedChatInput,
			});
			setChatInput("");
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<View style={styles.rectangle}>
				<TouchableOpacity
					style={styles.iconImage}
					onPress={handleClick}
				>
					{plusClick ? <IconImageExit /> : <IconImagePlus />}
				</TouchableOpacity>
				<TextInput
					style={styles.input}
					value={chatInput}
					onChangeText={setChatInput}
					onFocus={handleInputFocus}
				/>
				<View style={styles.rectangleBlue}>
					<TouchableOpacity onPress={handleSend}>
						<IconChatSend />
					</TouchableOpacity>
				</View>
			</View>
			{plusClick && (
				<TouchableWithoutFeedback onPress={handleKeyboard}>
					<View style={styles.rectangleImage}>
						<View style={styles.containerIconCircle}>
							<TouchableOpacity style={styles.iconCircleCamera}>
								<IconCircleCamera />
								<Text style={styles.textIconCircle}>
									카메라
								</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.iconCircleGallery}>
								<IconCircleGallery />
								<Text style={styles.textIconCircle}>
									갤러리
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			)}
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
		...fontBody14,
		alignItems: "center",
		width: 262,
		height: 36,
	},
	rectangleBlue: {
		width: 47.65,
		height: 48,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.primaryMedium,
	},
});

export default ChatInputSend;
