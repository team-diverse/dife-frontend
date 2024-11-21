import * as Sentry from "@sentry/react-native";
import {
	createSingleChatroom,
	getChatroomsByType,
	changeChatroomStatus,
} from "config/api";
import { getMyMemberId } from "util/secureStoreUtils";

export const createChatroom = async (
	otherMemberId,
	otherMemberName,
	chatrooms,
	subscribeToNewChatroom,
	fetchChatroomMessages,
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
		const exitedChatrooms = await getChatroomsByType("EXITED");
		const exitedChatroomData = exitedChatrooms?.data;
		const exitedChatroomInfo = exitedChatroomData.find((chatroom) => {
			const memberIds = chatroom.members.map((member) => member.id);
			return memberIds.includes(otherMemberId);
		});

		if (exitedChatroomInfo) {
			await changeChatroomStatus(exitedChatroomInfo.id);
			subscribeToNewChatroom(exitedChatroomInfo.id, token);
			fetchChatroomMessages(exitedChatroomInfo.id);
			return exitedChatroomInfo;
		} else if (!chatroomInfo) {
			const response = await createSingleChatroom(
				otherMemberId,
				otherMemberName,
			);
			chatroomInfo = response.data;
			subscribeToNewChatroom(chatroomInfo.id, token);
			fetchChatroomMessages(chatroomInfo.id);
		}
		return { chatroomInfo };
	} catch (error) {
		Sentry.captureException(error);
		console.error("채팅방 생성 에러:", error);
	}
};
