import { db, dbBody } from "@/lib/db";

export async function createAccount(email, password, name_last, name_first) {
	return fetch(
		`${db}/create_account.php`,
		dbBody({
			email: email,
			password: password,
			name_last: name_last,
			name_first: name_first,
		})
	);
}

export async function createAccountGuest(guest, password) {
	return fetch(
		`${db}/create_account_guest.php`,
		dbBody({
			guest: guest,
			password: password,
		})
	);
}

// export async function createAccount(email, password, name_last, name_first) {
// 	return fetch(`https://db.kennedyadams.ca/greenlife/create_account.php`, {
// 		method: "POST",
// 		headers: {
// 			accept: "application/json",
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			email: email,
// 			password: password,
// 			name_last: name_last,
// 			name_first: name_first,
// 			dbUSER: "hvgum487_kennedyG",
// 			dbPASS: "Kmma68062",
// 		}),
// 	}).then((res) => res.json());
// }

export async function deleteAccount(email, password) {
	return fetch(
		`${db}/delete_account.php`,
		dbBody({
			email: email,
			password: password,
		})
	);
}

export async function loginAccount(email, password) {
	return fetch(
		`${db}/login_account.php`,
		dbBody({
			email: email,
			password: password,
		})
	);
}

export async function resetPassword(id, code, password) {
	return fetch(
		`${db}/reset_password.php`,
		dbBody({
			id: id,
			code: code,
			password: password,
		})
	);
}

export async function getUser(user_id) {
	return fetch(
		`${db}/get_user.php`,
		dbBody({
			user_id: user_id,
		})
	);
}

export async function sendResetPasswordEmail(email) {
	return fetch(
		`${db}/send_reset_password.php`,
		dbBody({
			email: email,
		})
	);
}

export async function updateUser(user) {
	return fetch(
		`${db}/update_user.php`,
		dbBody({
			user: user,
		})
	);
}

export async function getInvoices(user_id) {
	return fetch(
		`${db}/get_invoices.php`,
		dbBody({
			user_id: user_id,
		})
	);
}

export async function getInvoice(code) {
	return fetch(
		`${db}/get_invoice.php`,
		dbBody({
			code: code,
		})
	);
}
export async function checkEmail(email) {
	return fetch(
		`${db}/check_email.php`,
		dbBody({
			email: email,
		})
	);
}
