const formatKoreanTime = (isoString) => {
	const date = new Date(isoString);
	const formatter = new Intl.DateTimeFormat("ko-KR", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
	return formatter.format(date);
};

export default formatKoreanTime;
