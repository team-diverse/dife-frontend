import * as Sentry from "@sentry/react-native";
import { createSingleChatroom } from "config/api";
import { getMyMemberId } from "util/secureStoreUtils";

export const createChatroom = async (
	otherMemberId,
	otherMemberName,
	chatrooms,
	subscribeToNewChatroom,
	token,
) => {
	const isRelevantSingleChatroom = (chatroom, myMemberId, otherMemberId) => {
		if (chatroom.chatroom_type !== "SINGLE") {
			return false;
		}
		const members = chatroom.members;
		const memberIds = members.map((member) => member.id);
		return (
			memberIds.includes(myMemberId) && memberIds.includes(otherMemberId)
		);
	};

	try {
		const myMemberId = await getMyMemberId();
		let chatroomInfo = chatrooms.find((chatroom) =>
			isRelevantSingleChatroom(chatroom, myMemberId, otherMemberId),
		);

		if (!chatroomInfo) {
			const response = await createSingleChatroom(
				otherMemberId,
				otherMemberName,
			);
			chatroomInfo = response.data;
			subscribeToNewChatroom(chatroomInfo.id, token);
		}
		return chatroomInfo;
	} catch (error) {
		Sentry.captureException(error);
		console.log("채팅방 생성 에러:", error);
	}
};
