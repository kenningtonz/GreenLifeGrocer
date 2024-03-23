export const db = "https://db.kennedyadams.ca/greenlife";

export const dbBody = (body) => {
	return {
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...body,
			dbUSER: "hvgum487_kennedyG",
			dbPASS: "Kmma68062",
		}),
	};
};
