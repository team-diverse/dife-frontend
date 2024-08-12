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

export const getProfile = () => {
	return api.get("/members/profile");
};

export const headCheckUserName = (username) => {
	return api.head("/members", {
		params: {
			username,
		},
	});
};

export const updateProfile = (member_id, formData) => {
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

export const createPost = (title, content, isPublic, boardType, postFile) => {
	const formData = new FormData();
	formData.append("title", title);
	formData.append("content", content);
	formData.append("isPublic", isPublic);
	formData.append("boardType", boardType);
	formData.append("postFile", postFile || null);

	const headers = {
		"Content-Type": "multipart/form-data",
	};

	return api.post("/posts", formData, { headers });
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

export const getLikedPost = () => {
	return api.get("/likes");
};

export const getBookmarkPost = () => {
	return api.get("/bookmarks");
};

export const createComment = (postId, valueComment, isChecked) => {
	return api.post("/comments", {
		content: valueComment,
		isPublic: isChecked,
		postId: postId,
	});
};

export const createReplyComment = (
	postId,
	valueComment,
	isChecked,
	parentCommentId,
) => {
	return api.post("/comments", {
		content: valueComment,
		isPublic: isChecked,
		postId: postId,
		parentCommentId: parentCommentId,
	});
};

export const getCommentById = (id) => {
	return api.get(`comments/${id}`);
};

export const createLike = (type, postId, commentId) => {
	return api.post("/likes", {
		type: "POST",
		id: postId,
	});
};

export const createLikeComment = (commentId) => {
	return api.post("/likes", {
		type: "COMMENT",
		id: commentId,
	});
};

export const createLikeMember = (memberId) => {
	return api.post("/likes", {
		type: "MEMBER",
		id: memberId,
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

export const getConnectById = (memberId) => {
	return api.get(`/connects/`, {
		params: {
			member_id: memberId,
		},
	});
};

export const getProfileById = (memberId) => {
	return api.get(`/members/${memberId}`);
};

export const requestConnectById = (memberId) => {
	return api.post("/connects/", {
		to_member_id: memberId,
	});
};

export const getConnectList = () => {
	return api.get(`/connects`);
};

export const getProfileImageByFileName = (fileName) => {
	return api.get(`/files`, {
		params: {
			fileName: fileName,
		},
	});
};

export const deleteConnectById = (connectId) => {
	return api.delete(`/connects/${connectId}`);
};

export const deleteBookmarkByPostId = (postId) => {
	return api.delete(`/bookmarks`, {
		data: {
			type: "POST",
			postId: postId,
		},
	});
};

export const deleteLikeByPostId = (postId) => {
	return api.delete(`/likes`, {
		data: {
			type: "POST",
			id: postId,
		},
	});
};

export const deleteLikeByCommentId = (commentId) => {
	return api.delete(`/likes`, {
		data: {
			type: "COMMENT",
			id: commentId,
		},
	});
};

export const deleteLikeByMemberId = (memberId) => {
	return api.delete(`/likes`, {
		data: {
			type: "MEMBER",
			id: memberId,
		},
	});
};

export const getMyPosts = () => {
	return api.get("/members/posts");
};

export const getMyComments = () => {
	return api.get("/members/comments");
};

export const createNotificationToken = (pushToken, deviceId) => {
	return api.post("/notifications/push", {
		pushToken,
		deviceId,
	});
};