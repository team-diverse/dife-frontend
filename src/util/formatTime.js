const formatTime = (isoString, userLanguage) => {
	const date = new Date(isoString);

	const localeMap = {
		KO: "ko-KR",
		ES: "es-ES",
		EN: "en-US",
		JA: "ja-JP",
		ZH: "zh-CN",
	};

	const locale = localeMap[userLanguage] || "en-US";

	const formatter = new Intl.DateTimeFormat(locale, {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
	return formatter.format(date);
};

export default formatTime;
