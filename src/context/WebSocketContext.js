import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { Client } from "@stomp/stompjs";
import { getChatroomsByType } from "../config/api"; // Adjust the import path as necessary
import { WS_URL } from "@env";
import Loading from "@components/common/loading/Loading";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
	const ws = useRef(null);
	const [chatrooms, setChatrooms] = useState([]);
	const [messages, setMessages] = useState({});
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		ws.current = new Client({
			brokerURL: WS_URL,
			debug: (str) => {
				console.log(str);
			},
			reconnectDelay: 0,
			onConnect: async () => {
				const { allChatrooms } = await updateChatroomsAndMessages();
				subscribeToChatrooms(allChatrooms);
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

		return () => {
			if (ws.current) {
				disconnectWebSocket();
			}
		};
	}, []);

	const updateChatroomsAndMessages = async () => {
		const { allChatrooms, initialMessages } =
			await getAuthorizedChatrooms();
		setChatrooms(allChatrooms);
		setMessages(initialMessages);
		return { allChatrooms, initialMessages };
	};

	const subscribeToChatrooms = (chatrooms) => {
		chatrooms.forEach(({ id }) => {
			ws.current.subscribe(`/sub/chatroom/${id}`, (message) => {
				handleIncomingMessage(id, message.body);
			});
		});
	};

	const subscribeToNewChatroom = (chatroomId) => {
		ws.current.subscribe(`/sub/chatroom/${chatroomId}`, (message) => {
			handleIncomingMessage(chatroomId, message.body);
		});
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

	const getAuthorizedChatrooms = async () => {
		const groupChatroomResult = await getChatroomsByType("GROUP");
		const singleChatroomResult = await getChatroomsByType("SINGLE");
		const allChatrooms = [
			...groupChatroomResult.data,
			...singleChatroomResult.data,
		];

		const initialMessages = allChatrooms.reduce((acc, chatroom) => {
			acc[chatroom.id] = sortByIds(chatroom.chats || []);
			return acc;
		}, {});

		return { allChatrooms, initialMessages };
	};

	const sortByIds = (array) => {
		return array.sort((a, b) => a.id - b.id);
	};

	const publishMessage = (message) => {
		if (ws.current && ws.current.connected) {
			ws.current.publish({
				destination: `/pub/chatroom/chat`,
				body: JSON.stringify(message),
			});
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
