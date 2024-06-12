import axios from "axios";

const BACKEND_URL = "http://localhost:8080/api";

export const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-type": "application/json",
    }
});

api.interceptors.request.use((config) => {
    // localStorage.setItem("token", "<TOKEN>");
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
});

export const getChatroomsByType = async (type) => {
    return await api.get('/chatrooms', {
        params: {
            chatroomType: type
        }
    });
}
