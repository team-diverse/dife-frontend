export const formatAge = (birth, today = new Date()) => {
	if (!Array.isArray(birth) || birth.length < 3) {
		return String(birth);
	}

	const [year, month, day] = birth;
	const parsedYear = Number(year);
	const parsedMonth = Number(month);
	const parsedDay = Number(day);

	if (
		!Number.isInteger(parsedYear) ||
		!Number.isInteger(parsedMonth) ||
		!Number.isInteger(parsedDay)
	) {
		return null;
	}

	const birthDate = new Date(parsedYear, parsedMonth - 1, parsedDay);
	const isInvalidDate =
		birthDate.getFullYear() !== parsedYear ||
		birthDate.getMonth() !== parsedMonth - 1 ||
		birthDate.getDate() !== parsedDay;

	if (isInvalidDate) {
		return null;
	}

	let age = today.getFullYear() - parsedYear;
	const hasHadBirthdayThisYear =
		today.getMonth() > parsedMonth - 1 ||
		(today.getMonth() === parsedMonth - 1 && today.getDate() >= parsedDay);

	if (!hasHadBirthdayThisYear) {
		age -= 1;
	}

	return age >= 0 ? age : null;
};
