export function dateFormatter(date) {
	const options = {
		hour: "numeric",
		minute: "numeric",
		weekday: "short",
		month: "long",
		day: "numeric",
		year: "numeric",
	};
	return new Date(date).toLocaleDateString("en-CA", options);
}
