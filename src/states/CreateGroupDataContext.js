import React, { createContext, useContext, useState } from "react";

const CreateGroupDataContext = createContext();

export const useCreateGroup = () => useContext(CreateGroupDataContext);

export const CreateGroupProvider = ({ children }) => {
	const [createGroupData, setCreateGroupData] = useState({
		profileImg: "",
		name: "",
		description: "",
		hobbies: "",
		languages: "",
		categories: "",
		limitMembersNumber: "",
		isPublic: "",
		groupPassword: "",
	});

	const updateCreateGroupData = (newData) => {
		setCreateGroupData((prev) => {
			const updatedData = { ...prev, ...newData };
			// console.log("그룹 데이터:", updatedData);
			return updatedData;
		});
	};

	return (
		<CreateGroupDataContext.Provider
			value={{ createGroupData, updateCreateGroupData }}
		>
			{children}
		</CreateGroupDataContext.Provider>
	);
};
