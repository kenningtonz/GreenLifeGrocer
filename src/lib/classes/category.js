import { db, dbBody } from "@/lib/db";

// export async function getCategories() {
// 	return fetch(`${db}/get_categories.php`, dbBody({})).then((res) =>
// 		res.json().then((data) => data.categories)
// 	);
// }

// export async function getFamilies(category) {
// 	return fetch(
// 		`${db}/get_families.php`,
// 		dbBody({
// 			category_id: category,
// 		})
// 	).then((res) => res.json().then((data) => data.families));
// }

export async function getCategories() {
	return fetch(`https://db.kennedyadams.ca/greenlife/get_categories.php`, {
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			dbUSER: "hvgum487_kennedyG",
			dbPASS: "Kmma68062",
		}),
	}).then((res) => res.json());
}

export async function getFamilies(category) {
	return fetch(`https://db.kennedyadams.ca/greenlife/get_families.php`, {
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			category_id: category,
			dbUSER: "hvgum487_kennedyG",
			dbPASS: "Kmma68062",
		}),
	}).then((res) => res.json());
}
