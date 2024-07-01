import axios from "axios";

const BACKEND_URL = "http://192.168.0.30:8080/api";

export const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidHlwZSI6ImFjY2Vzc1Rva2VuIiwiaXNzIjoiZGlmZSIsImlhdCI6MTcxNzUxNjg2MywiZXhwIjoxNzE3NTIwNDYzfQ.Lp6ul_eKDsis-RPO8gofD2NwDncQiU6deHzh0gXVQLY";
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
  memberId
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

export const postHeart = (id) => {
  return api.post("/likes", {
    type: "POST",
    postId: id,
    commentId: "",
  });
};

export const postCommentSend = (id, valueComment, isChecked) => {
  return api.post(`comments/${id}`, {
    content: valueComment,
    isPublic: isChecked,
    postId: id,
    parentCommentId: 0,
  });
};

export const getCommentById = (id) => {
  return api.get(`comments/${id}`);
};

export const postCommentHeart = (id, commentId) => {
  return api.post("/likes", {
    type: "COMMENT",
    postId: id,
    commentId: commentId,
  });
};
