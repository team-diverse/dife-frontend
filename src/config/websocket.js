import { Client } from "@stomp/stompjs";
import { WS_URL } from "@env";
import { getRefreshToken } from "util/secureStoreUtils";

export const connectWebSocket = async (onMessage) => {
	try {
		const token = await getRefreshToken();
		if (!token) {
			console.error("Failed to retrieve token");
			return;
		}

		let client = new Client({
			brokerURL: WS_URL,
			debug: (str) => {
				console.log(str);
			},
			reconnectDelay: 0,
			connectHeaders: {
				authorization: `Bearer ${token}`,
			},
			onConnect: () => {
				onMessage("Connected to WebSocket");

				client.publish({
					destination: "/pub/chatroom/chat",
					headers: {
						"content-type": "application/json",
						authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						message: "Hello, this is a test message.",
					}),
				});
			},
			onStompError: (frame) => {
				console.log(
					"Broker reported error: " + frame.headers["message"],
				);
				console.log("Additional details: " + frame.body);
			},
			onWebSocketError: (error) => {
				console.log("Websocket error: " + error);
			},
			onWebSocketClose: () => {
				console.log("Websocket connection closed");
			},
		});
		client.activate();
	} catch (error) {
		console.error("Failed to retrieve the token:", error);
	}
};
