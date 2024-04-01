import { db, dbBody } from "@/lib/db";

// export async function getSearch(search) {
// 	return fetch("https://db.kennedyadams.ca/greenlife/get_search.php", {
// 		method: "POST",
// 		body: JSON.stringify({ search: search }),
// 		headers: {
// 			accept: "application/json",
// 			"Content-Type": "application/json",
// 		},
// 	}).then((res) => res.json());
// }

export async function getSearch(search) {
	return fetch(
		`${db}/get_search.php`,
		dbBody({
			search: search,
		})
	);
}

export async function getSearchHints(search) {
	return fetch(
		`${db}/get_hints.php`,
		dbBody({
			search: search,
		})
	);
}
