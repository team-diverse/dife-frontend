export const formatProfileData = (data) => {
	function cleanHobbies(hobbies) {
		return hobbies.map((hobby) => hobby.replace(/[[\]"]/g, ""));
	}

	return data.map((item) => {
		const cleanedHobbies = cleanHobbies(item.hobbies);

		let tags = [...cleanedHobbies];
		if (item.mbti !== null) {
			tags = [item.mbti, ...tags];
		}
		if (item.categories && item.categories.length > 0) {
			tags = [...item.categories, ...tags];
		}

		return { ...item, tags };
	});
};
