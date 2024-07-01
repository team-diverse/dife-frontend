import { Client } from "@stomp/stompjs";

const WS_URL = "ws://localhost:8080/ws";

export const connectWebSocket = (onMessage) => {
    let client = new Client({
        brokerURL: WS_URL,
        debug: (str) => {
            console.log(str);
        },
        reconnectDelay: 0,
        onConnect: () => {
            onMessage("Connected to WebSocket");
        },
        onStompError: (frame) => {
            console.log("Broker reported error: " + frame.headers["message"]);
            console.log("Additional details: " + frame.body);
        },
        onWebSocketError: (error) => {
            console.log("Websocket error: " + error);
        },
        onWebSocketClose: (closeEvent) => {
            console.log("Websocket connection closed");
        },
    });
    client.activate();
};
