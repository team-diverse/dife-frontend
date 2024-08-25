export const formatProfileData = (data) => {
	const CategoryEnum = {
		COMMUNICATION: "COMMUNICATION",
		EXCHANGE: "EXCHANGE",
		FREE: "FREE",
	};

	const categoryEnumToKorean = (enumValue) => {
		const enumMap = {
			[CategoryEnum.COMMUNICATION]: "소통/친구 사귀기",
			[CategoryEnum.EXCHANGE]: "언어교환",
			[CategoryEnum.FREE]: "자유",
		};
		return enumMap[enumValue] || enumValue;
	};

	function cleanHobbies(hobbies) {
		return hobbies.map((hobby) => hobby.replace(/[[\]"]/g, ""));
	}

	return data.map((item) => {
		const cleanedHobbies = cleanHobbies(item.hobbies);

		let tags = [...cleanedHobbies];
		if (item.mbti !== null && item.mbti !== undefined) {
			tags = [item.mbti, ...tags];
		}
		if (item.purposes && item.purposes.length > 0) {
			const purposes = item.purposes.map(categoryEnumToKorean);
			tags = [...purposes, ...tags];
		}

		return { ...item, tags };
	});
};
