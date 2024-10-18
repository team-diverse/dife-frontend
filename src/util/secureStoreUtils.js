import * as SecureStore from "expo-secure-store";
import * as Sentry from "@sentry/react-native";

export const getMyMemberId = async () => {
	try {
		const myMemberId = await SecureStore.getItemAsync("memberId");
		return myMemberId ? parseInt(myMemberId) : null;
	} catch (error) {
		console.error("본인 memberId를 로컬에서 가져올 수 없습니다.", error);
		Sentry.captureException(error);
		return null;
	}
};

export const getRefreshToken = async () => {
	try {
		const token = await SecureStore.getItemAsync("refreshToken");
		return token;
	} catch (error) {
		console.error("Failed to retrieve the refresh token:", error);
	}
};
