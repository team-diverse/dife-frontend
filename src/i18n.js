import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import en from "src/translations/en.json";
import ko from "src/translations/ko.json";
import ja from "src/translations/ja.json";
import zh from "src/translations/zh.json";
import es from "src/translations/es.json";

const resources = {
	en: { translation: en },
	ko: { translation: ko },
	ja: { translation: ja },
	zh: { translation: zh },
	es: { translation: es },
};

i18n.use(initReactI18next).init({
	resources,
	lng: getLocales()[0].languageCode,
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
