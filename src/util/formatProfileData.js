export const formatProfileData = (data) => {
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
			tags = [...item.purposes, ...tags];
		}

		return { ...item, tags };
	});
};
