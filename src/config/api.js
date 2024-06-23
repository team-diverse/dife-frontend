import axios from "axios";

const BACKEND_URL = "http://192.168.0.30:8080/api";

export const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-type": "application/json",
    }
});

api.interceptors.request.use((config) => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidHlwZSI6ImFjY2Vzc1Rva2VuIiwiaXNzIjoiZGlmZSIsImlhdCI6MTcxNzUxNjg2MywiZXhwIjoxNzE3NTIwNDYzfQ.Lp6ul_eKDsis-RPO8gofD2NwDncQiU6deHzh0gXVQLY"
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
});

export const getChatroomsByType = (type) => {
    return api.get("/chatrooms", {
            params: {
            chatroomType: type,
        },
    });
            }

export const signUp = (email, password) => {
    return api.post("/members/register", {
        email,
        password,
    });
}

export const login = (email, password) => {
    return api.post("/members/login", {
        email,
        password,
        });
}

export const getProfile = () => {
    return api.get("/members/profile");
}

export const headCheckUserName = (username) => {
    return api.head("/members", {
        params: {
            username,
        }
    });
}

export const updateProfile = (member_id, formData) => {
    return api.put(`/members/${member_id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}
