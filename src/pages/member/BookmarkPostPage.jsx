import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";

import BookmarkPostStyles from "@pages/member/BookmarkPostStyles";

import { getBookmarkPost } from "config/api";
import ItemLikeBookmark from "@components/member/ItemLikeBookmark";

const BookmarkPostPage = () => {
  const [bookmarkPostList, setBookmarkPostList] = useState([]);

  useEffect(() => {
    const handleBookmarkPost = async () => {
      try {
        const bookmarkPostResponse = await getBookmarkPost();
        setBookmarkPostList(bookmarkPostResponse.data);
        console.log(bookmarkPostResponse.data);
      } catch (error) {
        console.error(
          "북마크한 게시글 조회 오류:",
          error.response ? error.response.data : error.message
        );
      }
    };
    handleBookmarkPost();
  }, []);

  return (
    <View style={BookmarkPostStyles.container}>
      <ScrollView>
        <View style={BookmarkPostStyles.itemLikeBookmark}>
          <ItemLikeBookmark props={bookmarkPostList} type="bookmark" />
        </View>
      </ScrollView>
    </View>
  );
};

export default BookmarkPostPage;
