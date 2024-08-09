import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";

export const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-type": "application/json",
	},
});

api.interceptors.request.use(async (config) => {
	const token = await SecureStore.getItemAsync("accessToken");
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}
	return config;
});

export const getChatroomsByType = (type) => {
	return api.get("/chatrooms", {
		params: {
			chatroomType: type,
		},
	});
};

export const createSingleChatroom = (toMemberId, name) => {
	const formData = new FormData();
	formData.append("chatroomType", "SINGLE");
	formData.append("toMemberId", toMemberId);
	formData.append("name", name);

	const headers = {
		"Content-Type": "multipart/form-data",
	};
	return api.post("/chatrooms", formData, { headers });
};

export const signUp = (email, password) => {
	return api.post("/members/register", {
		email,
		password,
	});
};

export const login = (email, password) => {
	return api.post("/members/login", {
		email,
		password,
	});
};

export const changePassword = (email) => {
	return api.get("/members/change-password", {
		params: {
			email,
		},
	});
};

export const getMyConnects = () => {
	return api.get("/connects");
};

export const getMyProfile = () => {
	return api.get("/members/profile");
};

export const checkUsername = (username) => {
	return api.head("/members", {
		params: {
			username,
		},
	});
};

export const updateMyProfile = (member_id, formData) => {
	return api.put(`/members/${member_id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const getRandomMembersByCount = (count) => {
	return api.get("/members/random", {
		params: {
			count,
		},
	});
};

export const getPostsByType = (type) => {
	return api.get("/posts", {
		params: {
			boardCategory: type,
		},
	});
};

export const getPostById = (id) => {
	return api.get(`/posts/${id}`);
};

export const deletePost = (id) => {
	return api.delete(`/posts/${id}`);
};

export const createPost = (title, content, isPublic, boardType) => {
	return api.post("/posts", {
		title,
		content,
		isPublic,
		boardType,
	});
};

export const updatePost = (
	id,
	title,
	content,
	isPublic,
	boardType,
	memberId,
) => {
	return api.put(`/posts/${id}`, {
		title,
		content,
		isPublic,
		boardType,
		memberId,
	});
};

export const getLikedPosts = () => {
	return api.get("/likes");
};

export const getBookmarkedPosts = () => {
	return api.get("/bookmarks");
};

export const createComment = (postId, valueComment, isChecked) => {
	return api.post(`comments/${postId}`, {
		content: valueComment,
		isPublic: isChecked,
		postId: postId,
		parentCommentId: 0,
	});
};

export const getCommentByPostId = (postId) => {
	return api.get(`comments/${postId}`);
};

export const createLikePost = (postId) => {
	return api.post("/likes", {
		type: "POST",
		postId: postId,
		commentId: "",
	});
};

export const createLikeComment = (postId, commentId) => {
	return api.post("/likes", {
		type: "COMMENT",
		postId: postId,
		commentId: commentId,
	});
};

export const createBookmark = (chatroomId, chatId, postId) => {
	return api.post("/bookmarks", {
		chatroomId: chatroomId,
		chatId: chatId,
		postId: postId,
	});
};

export const getConnectSearch = (keyword) => {
	return api.get("/members/search", {
		params: {
			keyword: keyword,
		},
	});
};

export const getConnectFilter = (mbtis, hobbies, languages) => {
	return api.get("/members/filter", {
		params: {
			mbtis: mbtis,
			hobbies: hobbies,
			languages: languages,
		},
	});
};
