import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { Client } from "@stomp/stompjs";
import { getChatroomsByType, getChatsByChatroomId } from "../config/api";
import Loading from "@components/common/loading/Loading";
import { sortByIds } from "util/util";
import * as SecureStore from "expo-secure-store";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
	const ws = useRef(null);
	const [chatrooms, setChatrooms] = useState([]);
	const [messages, setMessages] = useState({});
	const [isConnected, setIsConnected] = useState(false);
	const [token, setToken] = useState(null);
	const WS_URL = process.env.EXPO_PUBLIC_WS_URL;

	useEffect(() => {
		const connectWebSocket = async () => {
			try {
				const token = await SecureStore.getItemAsync("refreshToken");
				setToken(token);
			} catch (error) {
				console.error("Failed to retrieve the refresh token:", error);
			}

			ws.current = new Client({
				brokerURL: WS_URL,
				debug: (str) => {
					console.log(str);
				},
				reconnectDelay: 0,
				connectHeaders: {
					authorization: `Bearer ${token}`,
				},
				onConnect: async () => {
					const { allChatrooms } = await updateChatroomsAndMessages();
					subscribeToChatrooms(allChatrooms, token);
					setIsConnected(true);
				},
				onStompError: (frame) => {
					console.log(
						"Broker reported error: " + frame.headers["message"],
					);
					console.log("Additional details: " + frame.body);
				},
				onWebSocketError: (error) => {
					console.log("WebSocket error: " + error);
				},
				onWebSocketClose: () => {
					console.log("WebSocket connection closed");
				},
			});

			ws.current.activate();
		};

		connectWebSocket();

		return () => {
			if (ws.current) {
				disconnectWebSocket();
			}
		};
	}, [token]);

	const updateChatroomsAndMessages = async () => {
		const { allChatrooms, initialMessages } =
			await getAuthorizedChatrooms();
		setChatrooms(allChatrooms);
		setMessages(initialMessages);
		return { allChatrooms, initialMessages };
	};

	const subscribeToChatrooms = (chatrooms, token) => {
		chatrooms.forEach(({ id }) => {
			ws.current.subscribe(
				`/sub/chatroom/${id}`,
				(message) => {
					handleIncomingMessage(id, message.body);
				},
				{
					authorization: `Bearer ${token}`,
				},
			);
		});
	};

	const subscribeToNewChatroom = (chatroomId, token) => {
		ws.current.subscribe(
			`/sub/chatroom/${chatroomId}`,
			(message) => {
				handleIncomingMessage(chatroomId, message.body);
			},
			{
				authorization: `Bearer ${token}`,
			},
		);
	};

	const handleIncomingMessage = (chatroomId, message) => {
		setMessages((prevMessages) => {
			const updatedMessages = { ...prevMessages };
			if (!updatedMessages[chatroomId]) {
				updatedMessages[chatroomId] = [];
			}
			updatedMessages[chatroomId].push(JSON.parse(message));
			return updatedMessages;
		});
	};

	const fetchInitialMessages = async (allChatrooms) => {
		const messages = {};
		for (const chatroom of allChatrooms) {
			const chats = await getChatsByChatroomId(chatroom.id);
			messages[chatroom.id] = sortByIds(chats.data || []);
		}
		return messages;
	};

	const getAuthorizedChatrooms = async () => {
		const groupChatroomResult = await getChatroomsByType("GROUP");
		const singleChatroomResult = await getChatroomsByType("SINGLE");
		const allChatrooms = [
			...groupChatroomResult.data,
			...singleChatroomResult.data,
		];
		const initialMessages = await fetchInitialMessages(allChatrooms);
		return { allChatrooms, initialMessages };
	};

	const publishMessage = (message) => {
		if (ws.current && ws.current.connected) {
			const { token, ...messageWithoutToken } = message;

			ws.current.publish({
				destination: `/pub/chatroom/chat`,
				headers: {
					"content-type": "application/json",
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(messageWithoutToken),
			});
			console.log(messageWithoutToken);
		} else {
			console.log("Client is not connected");
		}
	};

	const disconnectWebSocket = () => {
		ws.current.deactivate();
		setIsConnected(false);
	};

	return (
		<WebSocketContext.Provider
			value={{
				ws,
				chatrooms,
				messages,
				publishMessage,
				updateChatroomsAndMessages,
				subscribeToNewChatroom,
				disconnectWebSocket,
			}}
		>
			{isConnected ? children : <Loading />}
		</WebSocketContext.Provider>
	);
};

export const useWebSocket = () => {
	return useContext(WebSocketContext);
};
