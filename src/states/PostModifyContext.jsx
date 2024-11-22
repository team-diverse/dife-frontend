import React, { createContext, useContext, useState } from "react";

const PostModifyContext = createContext();

export const usePostModify = () => useContext(PostModifyContext);

export const PostModifyProvider = ({ children }) => {
	const [postModifyData, setPostModifyData] = useState({
		memberId: "",
		id: "",
		title: "",
		context: "",
		images: [],
		boardType: "",
		isAnonymous: true,
	});

	const updatePostModifyData = (newData) => {
		setPostModifyData((prev) => {
			const updatedData = { ...prev, ...newData };
			return updatedData;
		});
	};

	return (
		<PostModifyContext.Provider
			value={{ postModifyData, updatePostModifyData }}
		>
			{children}
		</PostModifyContext.Provider>
	);
};
