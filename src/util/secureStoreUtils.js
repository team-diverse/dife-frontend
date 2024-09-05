import * as SecureStore from "expo-secure-store";

export const getMyMemberId = async () => {
	try {
		const myMemberId = await SecureStore.getItemAsync("memberId");
		return myMemberId ? parseInt(myMemberId) : null;
	} catch (error) {
		console.error("본인 memberId를 로컬에서 가져올 수 없습니다.", error);
		return null;
	}
};
