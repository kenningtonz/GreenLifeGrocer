export async function getSearch(search) {
	return fetch("https://db.kennedyadams.ca/greenlife/get_search.php", {
		method: "POST",
		body: JSON.stringify({ search: search }),
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
}
