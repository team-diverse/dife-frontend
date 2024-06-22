import React, { createContext, useContext, useState } from 'react';

const PostModifyContext = createContext();

export const usePostModify = () => useContext(PostModifyContext);

export const PostModifyProvider = ({ children }) => {
    const [postModifyData, setPostModifyData] = useState({
        memberId: '',
        id: '',
        title: '',
        context: '',
        boardType: '',
    });

    const updatePostModifyData = (newData) => {
        setPostModifyData(prev => {
            const updatedData = { ...prev, ...newData };
            // console.log("게시글 수정용 데이터:", updatedData);
            return updatedData;
        });
    };

    return (
        <PostModifyContext.Provider value={{ postModifyData, updatePostModifyData }}>
            {children}
        </PostModifyContext.Provider>
    );
};