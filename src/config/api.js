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

export const createGroupChatroom = (
	profileImg,
	name,
	description,
	hobbies,
	maxCount,
	purposes,
	languages,
	isPublic,
	password,
) => {
	const formData = new FormData();
	formData.append("chatroomType", "GROUP");
	formData.append("name", name);
	formData.append("description", description);
	formData.append("hobbies", hobbies);
	formData.append("maxCount", maxCount);
	formData.append("purposes", purposes);
	formData.append("languages", languages);
	formData.append("isPublic", isPublic);
	formData.append("password", password);

	if (profileImg) {
		const file = {
			uri: profileImg,
			type: "image/jpeg",
			name: `${name}_profile.jpg`,
		};
		formData.append("profileImg", file);
	}

	const headers = {
		"Content-Type": "multipart/form-data",
	};
	return api.post("/chatrooms", formData, { headers });
};

export const checkGroupName = (name) => {
	return api.head("/chatrooms/check", {
		params: {
			name,
		},
	});
};

export const getGroups = () => {
	return api.get("/chatrooms", {
		params: {
			chatroomType: "GROUP",
		},
	});
};

export const getGroupByGroupId = (groupId) => {
	return api.get(`/chatrooms/${groupId}`);
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

export const getMyAcceptedConnects = () => {
	return api.get("/connects", {
		params: {
			status: "ACCEPTED",
		},
	});
};

export const getMyPendingConnects = () => {
	return api.get("/connects", {
		params: {
			status: "PENDING",
		},
	});
};

export const getMyProfile = () => {
	return api.get("/members/profile");
};

export const checkUsername = (username) => {
	return api.head("/members/check", {
		params: {
			email: null,
			username,
		},
	});
};

export const checkEmail = (email) => {
	return api.head("/members/check", {
		params: {
			email,
			username: null,
		},
	});
};

export const updateMyProfile = (formData) => {
	return api.put(`/members`, formData, {
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
	if (postFile) {
		const file = {
			uri: postFile,
			type: "image/jpeg",
			name: `image_${postFile}.jpg`,
		};
		formData.append("profileImg", file);
	}

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
	const formData = new FormData();
	formData.append("title", title);
	formData.append("content", content);
	formData.append("isPublic", isPublic);
	formData.append("boardType", boardType);
	formData.append("memberId", memberId);

	const headers = {
		"Content-Type": "multipart/form-data",
	};

	return api.put(`/posts/${id}`, formData, { headers });
};

export const getLikedPost = () => {
	return api.get("/likes");
};

export const getBookmarkedPost = () => {
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

export const getCommentByPostId = (postId) => {
	return api.get(`/comments/${postId}`);
};

export const createLikePost = (postId) => {
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

export const getLikeChatroom = () => {
	return api.get("/chatrooms/likes");
};

export const createLikeChatroom = (chatroomId) => {
	return api.post("/likes", {
		type: "CHATROOM",
		id: chatroomId,
	});
};

export const deleteLikeChatroom = (chatroomId) => {
	return api.delete("/likes", {
		data: {
			type: "CHATROOM",
			id: chatroomId,
		},
	});
};

export const getLikeMember = () => {
	return api.get("/members/likes");
};

export const createLikeMember = (memberId) => {
	return api.post("/likes", {
		type: "MEMBER",
		id: memberId,
	});
};

export const deleteLikeMember = (memberId) => {
	return api.delete("/likes", {
		data: {
			type: "MEMBER",
			id: memberId,
		},
	});
};

export const createPostBookmark = (postId) => {
	return api.post("/bookmarks", {
		type: "POST",
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

export const getGroupConnectSearch = (keyword) => {
	return api.get("/chatrooms/search", {
		params: {
			keyword,
		},
	});
};

export const getGroupConnectFilter = (
	hobbies,
	languages,
	purposes,
	maxCount,
) => {
	return api.get("/chatrooms/filter", {
		params: {
			hobbies,
			languages,
			purposes,
			maxCount,
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

export const reportPost = (type, postId) => {
	return api.post("/reports", {
		type,
		postId,
	});
};

export const reportComment = (type, commentId) => {
	return api.post("/reports", {
		type,
		commentId,
	});
};

export const reportMember = (type, receiverId) => {
	return api.post("/reports", {
		type,
		receiverId,
	});
};

export const blockMember = (blockMemberId) => {
	return api.post("/blocks", {
		blockMemberId,
	});
};

export const getBlockMember = () => {
	return api.get("/blocks");
};

export const deleteBlockMember = (memberId) => {
	return api.delete("/blocks", {
		params: {
			memberId,
		},
	});
};

export const deleteMember = () => {
	return api.delete("/members");
};
