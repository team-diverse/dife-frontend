export const formatDate = (date) => {
	const datePart = date.split("T")[0];
	const monthDay = datePart.slice(5);
	return monthDay.replace("-", "/");
};
