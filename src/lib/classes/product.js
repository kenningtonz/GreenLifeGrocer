import { db, dbBody } from "@/lib/db";
// export async function getProducts(category, family = null) {
// 	return fetch(`http://db.kennedyadams.ca/greenlife/get_products.php`, {
// 		method: "POST",
// 		headers: {
// 			accept: "application/json",
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			category_id: category,
// 			family_id: family,
// 			dbUSER: "hvgum487_kennedyG",
// 			dbPASS: "Kmma68062",
// 		}),
// 	}).then((res) => res.json());
// }

// export async function getProduct(url) {
// 	return fetch(`http://db.kennedyadams.ca/greenlife/get_product.php`, {
// 		method: "POST",
// 		headers: {
// 			accept: "application/json",
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			url: url,
// 			dbUSER: "hvgum487_kennedyG",
// 			dbPASS: "Kmma68062",
// 		}),
// 	}).then((res) => res.json());
// }

export async function getRandomProducts(num, category = null, family = null) {
	return fetch(
		`${db}/get_products_random.php`,
		dbBody({
			category_id: category,
			family_id: family,
			limit: num,
		})
	).then((res) => res.json());
}

export async function getProducts(category, family = null) {
	return fetch(
		`${db}/get_products.php`,
		dbBody({
			category_id: category,
			family_id: family,
		})
	).then((res) => res.json());
}

export async function getProduct(url) {
	return fetch(
		`${db}/get_product.php`,
		dbBody({
			url: url,
		})
	).then((res) => res.json());
}
