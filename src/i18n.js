import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import en from "src/translations/en.json";
import ko from "src/translations/ko.json";
import ja from "src/translations/ja.json";
import zh from "src/translations/zh.json";
import es from "src/translations/es.json";

const translations = { en, ko, ja, zh, es };

const resources = Object.keys(translations).reduce((acc, code) => {
	acc[code] = { translation: translations[code] };
	return acc;
}, {});

const deviceLocale = getLocales()[0].languageCode;

i18n.use(initReactI18next).init({
	compatibilityJSON: "v3",
	resources,
	lng: deviceLocale,
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
