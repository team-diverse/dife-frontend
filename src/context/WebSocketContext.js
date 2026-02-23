import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { Client } from "@stomp/stompjs";
import { getChatroomsByType, getChatsByChatroomId } from "../config/api";
import { getRefreshToken } from "util/secureStoreUtils";

const WebSocketContext = createContext(null);

const getCreatedVariants = (created) => {
	if (!created) return { epochSec: "", compact: "", utcCompact: "" };
	const parsed = new Date(created);
	const epochSec = Number.isNaN(parsed.getTime())
		? ""
		: String(Math.floor(parsed.getTime() / 1000));
	const utcCompact = Number.isNaN(parsed.getTime())
		? ""
		: parsed.toISOString().slice(0, 19);
	const compact = String(created)
		.trim()
		.replace(/(\.\d{3})\d+/, "$1")
		.replace(/\.\d+/, "")
		.replace(/Z$/i, "")
		.replace(/[+-]\d{2}:?\d{2}$/, "")
		.slice(0, 19);
	return { epochSec, compact, utcCompact };
};

const getMessageKeys = (msg) => {
	const keys = [];
	if (msg?.key) keys.push(`key:${String(msg.key)}`);
	if (msg?.id !== undefined && msg?.id !== null) {
		keys.push(`id:${String(msg.id)}`);
	}
	const memberId =
		msg?.member?.id ?? msg?.memberId ?? msg?.member_id ?? "unknown";
	const content = (msg?.message ?? msg?.content ?? "").trim();
	const rawCreated = String(msg?.created ?? "").trim();
	const { epochSec, compact, utcCompact } = getCreatedVariants(msg?.created);
	if (epochSec) keys.push(`fb-epoch:${memberId}-${epochSec}-${content}`);
	if (compact) keys.push(`fb-compact:${memberId}-${compact}-${content}`);
	if (utcCompact) keys.push(`fb-utc:${memberId}-${utcCompact}-${content}`);
	if (rawCreated) keys.push(`fb-raw:${rawCreated}-${content}`);
	return keys;
};

const dedupeMessages = (list = []) => {
	const seen = new Set();
	const result = [];

	list.forEach((msg) => {
		const keys = getMessageKeys(msg);
		const hasDuplicate = keys.some((key) => seen.has(key));
		if (hasDuplicate) return;
		keys.forEach((key) => seen.add(key));
		result.push(msg);
	});

	return result;
};

const sortMessagesByCreated = (list = []) => {
	return [...list].sort((a, b) => new Date(a.created) - new Date(b.created));
};

const getChatroomKey = (chatroomId) => String(chatroomId);

const isExitedStatus = (chatroom) => {
	return (
		String(
			chatroom?.status ??
				chatroom?.chatroomStatus ??
				chatroom?.chatroom_status ??
				"",
		).toUpperCase() === "EXITED"
	);
};

export const WebSocketProvider = ({ children }) => {
	const ws = useRef(null);
	const subscriptionsRef = useRef(new Map());
	const pendingSubscriptionsRef = useRef(new Set());
	const [chatrooms, setChatrooms] = useState([]);
	const [messages, setMessages] = useState({});
	const [isConnected, setIsConnected] = useState(false);
	const WS_URL = process.env.EXPO_PUBLIC_WS_URL;

	const handleIncomingMessage = useCallback((chatroomId, messageFrame) => {
		const rawBody =
			typeof messageFrame === "string"
				? messageFrame
				: messageFrame?.body;
		const parsed = JSON.parse(rawBody);
		const parsedId = parsed?.id;
		if (
			typeof parsedId === "number" &&
			!Number.isSafeInteger(parsedId) &&
			typeof parsed?.key === "string" &&
			parsed.key.startsWith("id:")
		) {
			parsed.id = parsed.key.replace(/^id:/, "");
		}
		setMessages((prevMessages) => {
			const current = prevMessages[chatroomId] || [];
			const merged = dedupeMessages([...current, parsed]);
			return {
				...prevMessages,
				[chatroomId]: merged,
			};
		});
	}, []);

	const doSubscribeChatroom = useCallback(
		(chatroomId) => {
			if (!ws.current || !ws.current.connected) return false;
			const key = getChatroomKey(chatroomId);
			if (subscriptionsRef.current.has(key)) {
				return true;
			}
			const subscription = ws.current.subscribe(
				`/sub/chatroom/${chatroomId}`,
				(message) => handleIncomingMessage(chatroomId, message),
			);
			subscriptionsRef.current.set(key, subscription);
			return true;
		},
		[handleIncomingMessage],
	);

	const subscribeToNewChatroom = useCallback(
		async (chatroomId) => {
			const key = getChatroomKey(chatroomId);
			if (subscriptionsRef.current.has(key)) {
				return;
			}
			if (!ws.current || !ws.current.connected) {
				pendingSubscriptionsRef.current.add(key);
				return;
			}
			doSubscribeChatroom(chatroomId);
		},
		[doSubscribeChatroom],
	);

	const subscribeToChatrooms = useCallback(
		async (targetChatrooms) => {
			if (!Array.isArray(targetChatrooms)) return;
			targetChatrooms.forEach(({ id }) => {
				doSubscribeChatroom(id);
			});
		},
		[doSubscribeChatroom],
	);

	const getAuthorizedChatrooms = async () => {
		const groupChatroomResult = await getChatroomsByType("GROUP");
		const singleChatroomResult = await getChatroomsByType("SINGLE");
		return [
			...groupChatroomResult.data,
			...singleChatroomResult.data,
		].filter((chatroom) => !isExitedStatus(chatroom));
	};

	const updateChatroomsAndMessages = async () => {
		const allChatrooms = await getAuthorizedChatrooms();
		setChatrooms(allChatrooms);
		return { allChatrooms };
	};

	const connectWebSocket = async () => {
		if (ws.current && ws.current.connected) return;

		const token = await getRefreshToken();
		ws.current = new Client({
			brokerURL: WS_URL,
			reconnectDelay: 3000,
			connectHeaders: {
				Authorization: `Bearer ${token}`,
			},
			forceBinaryWSFrames: true,
			heartbeatIncoming: 10000,
			heartbeatOutgoing: 10000,
			onConnect: async () => {
				subscriptionsRef.current.clear();
				const { allChatrooms } = await updateChatroomsAndMessages();
				await subscribeToChatrooms(allChatrooms);
				const pendingIds = Array.from(pendingSubscriptionsRef.current);
				pendingIds.forEach((pendingChatroomId) => {
					doSubscribeChatroom(pendingChatroomId);
				});
				pendingSubscriptionsRef.current.clear();
				setIsConnected(true);
			},
			onStompError: (frame) => {
				console.error("Broker reported error:", frame.body);
				setIsConnected(false);
			},
			onWebSocketError: (error) => {
				console.error("WebSocket error:", error);
				setIsConnected(false);
			},
			onWebSocketClose: () => {
				setIsConnected(false);
				subscriptionsRef.current.clear();
			},
		});

		ws.current.activate();
	};

	useEffect(() => {
		connectWebSocket();

		return () => {
			if (ws.current) {
				disconnectWebSocket();
			}
		};
	}, []);

	const fetchChatroomMessages = useCallback(async (chatroomId) => {
		const chats = await getChatsByChatroomId(chatroomId);
		const sorted = sortMessagesByCreated(chats.data || []);
		const deduped = dedupeMessages(sorted);
		let mergedMessages = deduped;
		setMessages((prev) => {
			const current = prev[chatroomId] || [];
			mergedMessages = sortMessagesByCreated(
				dedupeMessages([...current, ...deduped]),
			);
			return {
				...prev,
				[chatroomId]: mergedMessages,
			};
		});
		return mergedMessages;
	}, []);

	const clearChatroomMessages = useCallback((chatroomId) => {
		setMessages((prev) => {
			if (!prev[chatroomId]) return prev;
			const next = { ...prev };
			delete next[chatroomId];
			return next;
		});
	}, []);

	const unsubscribeToChatroom = useCallback(async (chatroomId) => {
		const key = getChatroomKey(chatroomId);
		pendingSubscriptionsRef.current.delete(key);
		const subscription = subscriptionsRef.current.get(key);
		if (subscription) {
			subscription.unsubscribe();
			subscriptionsRef.current.delete(key);
		}
	}, []);

	const publishMessage = async (message) => {
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
		}
	};

	const disconnectWebSocket = () => {
		if (ws.current) {
			ws.current.deactivate();
		}
		setIsConnected(false);
		subscriptionsRef.current.clear();
		pendingSubscriptionsRef.current.clear();
	};

	return (
		<WebSocketContext.Provider
			value={{
				ws,
				chatrooms,
				messages,
				isConnected,
				publishMessage,
				updateChatroomsAndMessages,
				subscribeToNewChatroom,
				fetchChatroomMessages,
				clearChatroomMessages,
				unsubscribeToChatroom,
				disconnectWebSocket,
			}}
		>
			{children}
		</WebSocketContext.Provider>
	);
};

export const useWebSocket = () => {
	return useContext(WebSocketContext);
};
