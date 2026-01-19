import * as SecureStore from "expo-secure-store";
import { getLocales } from "expo-localization";

import i18n from "src/i18n";
import { updateMyProfile } from "config/api";

const normalizeLang = (lang) => (lang ? lang.toLowerCase() : null);
const getDeviceLang = () =>
	(getLocales()?.[0]?.languageCode || "en").toLowerCase();

export async function syncLanguageWithServer(profileData, memberId) {
	const saved = normalizeLang(profileData?.settingLanguage);
	const deviceLang = getDeviceLang();

	const key = `languageInitialized_${memberId}`;
	const initialized = await SecureStore.getItemAsync(key);

	if (initialized !== "true") {
		const formData = new FormData();
		formData.append("settingLanguage", deviceLang.toUpperCase());
		await updateMyProfile(formData);

		await SecureStore.setItemAsync(key, "true");

		if (i18n.language !== deviceLang) await i18n.changeLanguage(deviceLang);
		return deviceLang;
	}

	if (saved) {
		if (i18n.language !== saved) await i18n.changeLanguage(saved);
		return saved;
	}
}
