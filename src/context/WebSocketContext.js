import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import { Client } from '@stomp/stompjs';
import { getChatroomsByType } from "../config/api"; // Adjust the import path as necessary

const WS_URL = 'ws://localhost:8080/ws';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const ws = useRef(null);
    const channels = useRef([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        ws.current = new Client({
            brokerURL: WS_URL,
            debug: (str) => {
                console.log(str);
            },
            reconnectDelay: 0,
            onConnect: async () => {
                const channelIds = await getAuthorizedChatroomIds()
                subscribeByChannelIds(channelIds);
                channels.current.push(...channelIds);
                setIsConnected(true);
            },
            onStompError: (frame) => {
                console.log('Broker reported error: ' + frame.headers['message']);
                console.log('Additional details: ' + frame.body);
            },
            onWebSocketError: (error) => {
                console.log('WebSocket error: ' + error);
            },
            onWebSocketClose: () => {
                console.log('WebSocket connection closed');
            },
        });

        ws.current.activate();

        return () => {
            if (ws.current) {
                disconnectWebSocket();
            }
        }
    }, []);

    const subscribeByChannelIds = channelIds => {
        channelIds.forEach(id => {
            ws.current.subscribe(`/sub/chatroom/${id}`, (message) => {
                console.log(message.body);
            });
        });
    };

    const subscribeByChannelId = channelId => {
        ws.current.subscribe(`/sub/chatroom/${channelId}`);
    }

    const unsubscribeByChannelId = channelId => {
        ws.current.unsubscribe(`/sub/chatroom/${channelId}`);
    }

    const connectWebSocket = () => {
        if (ws.current) {
            if (ws.current.active) {
                const channelIds = getAuthorizedChatroomIds();
                subscribeByChannelIds(ws.current, channelIds);
            } else {
                ws.current.activate();
            }
        }
    };

    const getAuthorizedChatroomIds = async () => {
        const groupChatroomResult = await getChatroomsByType('GROUP');
        const singleChatroomResult = await getChatroomsByType('SINGLE');
        return getChannelIdsFromData([...groupChatroomResult.data, ...singleChatroomResult.data]);
    };

    const publishMessage = message => {
        if (ws.current && ws.current.connected) {
            ws.current.publish({
                destination: `/pub/chatroom/chat`,
                body: JSON.stringify(message),
            });
        } else {
            console.log('Client is not connected');
        }
    };

    const disconnectWebSocket = () => {
            ws.current.deactivate();
            setIsConnected(false);
    };

    const getChannelIdsFromData = (data) => {
        return data.map((chatroom) => {
            return chatroom.id;
        });
    };

    return (
        <WebSocketContext.Provider value={{ws,  connectWebSocket, publishMessage, disconnectWebSocket }}>
            {isConnected ? children: <div>LOADING...</div>}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};