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
) => {
	const toUpper = (value) => String(value ?? "").toUpperCase();
	const toIdString = (value) => String(value ?? "");

	const isExitedStatus = (chatroom) => {
		return (
			toUpper(
				chatroom?.status ??
					chatroom?.chatroomStatus ??
					chatroom?.chatroom_status,
			) === "EXITED"
		);
	};

	const isRelevantSingleChatroom = (chatroom, myMemberId, otherMemberId) => {
		const roomType =
			chatroom?.chatroom_type ?? chatroom?.chatroomType ?? chatroom?.type;
		if (toUpper(roomType) !== "SINGLE") {
			return false;
		}
		const members = Array.isArray(chatroom?.members)
			? chatroom.members
			: [];
		const memberIds = members.map((member) => toIdString(member?.id));
		const myId = toIdString(myMemberId);
		const otherId = toIdString(otherMemberId);
		return memberIds.includes(myId) && memberIds.includes(otherId);
	};

	try {
		const myMemberId = await getMyMemberId();
		const latestSingleChatrooms = await getChatroomsByType("SINGLE");
		const activeSingleChatrooms = (
			latestSingleChatrooms?.data ??
			chatrooms ??
			[]
		).filter((chatroom) => !isExitedStatus(chatroom));

		let chatroomInfo = activeSingleChatrooms.find((chatroom) =>
			isRelevantSingleChatroom(chatroom, myMemberId, otherMemberId),
		);
		if (chatroomInfo) {
			return chatroomInfo;
		}

		const exitedChatrooms = await getChatroomsByType("EXITED");
		const exitedChatroomData = exitedChatrooms?.data ?? [];
		const exitedChatroomInfo = exitedChatroomData.find((chatroom) =>
			isRelevantSingleChatroom(chatroom, myMemberId, otherMemberId),
		);

		if (exitedChatroomInfo) {
			await changeChatroomStatus(exitedChatroomInfo.id);
			const singleChatrooms = await getChatroomsByType("SINGLE");
			chatroomInfo = (singleChatrooms?.data ?? []).find((chatroom) =>
				isRelevantSingleChatroom(chatroom, myMemberId, otherMemberId),
			);
			return chatroomInfo || exitedChatroomInfo;
		}

		const response = await createSingleChatroom(
			otherMemberId,
			otherMemberName,
		);
		chatroomInfo = response.data;
		return chatroomInfo;
	} catch (error) {
		Sentry.captureException(error);
		console.error("채팅방 생성 에러:", error);
	}
};
