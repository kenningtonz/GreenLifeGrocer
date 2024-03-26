import { db, dbBody } from "@/lib/db";

// export async function createAccount(email, password, name_last, name_first) {
// 	return fetch(
// 		`${db}/create_account.php`,
// 		dbBody({
// 			email: email,
// 			password: password,
// 			name_last: name_last,
// 			name_first: name_first,
// 		})
// 	).then((res) => res.json());
// }

export async function createAccount(email, password, name_last, name_first) {
	return fetch(`https://db.kennedyadams.ca/greenlife/create_account.php`, {
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: email,
			password: password,
			name_last: name_last,
			name_first: name_first,
			dbUSER: "hvgum487_kennedyG",
			dbPASS: "Kmma68062",
		}),
	}).then((res) => res.json());
}

export async function deleteAccount(email, password) {
	return fetch(
		`${db}/delete_account.php`,
		dbBody({
			email: email,
			password: password,
		})
	).then((res) => res.json());
}

export async function loginAccount(email, password) {
	return fetch(
		`${db}/login_account.php`,
		dbBody({
			email: email,
			password: password,
		})
	).then((res) => res.json());
}

export async function resetPassword(id, code, password) {
	return fetch(
		`${db}/reset_password.php`,
		dbBody({
			id: id,
			code: code,
			password: password,
		})
	).then((res) => res.json());
}

export async function getUser(user_id) {
	return fetch(
		`${db}/get_user.php`,
		dbBody({
			user_id: user_id,
		})
	).then((res) => res.json());
}

export async function sendResetPasswordEmail(email) {
	return fetch(
		`${db}/send_reset_password.php`,
		dbBody({
			email: email,
		})
	).then((res) => res.json());
}

export async function updateUser(user) {
	return fetch(
		`${db}/update_user.php`,
		dbBody({
			user: user,
		})
	).then((res) => res.json());
}
