class User {
	constructor(email, password, name_last, name_first) {
		this.email = email;
		this.password = password;
		this.name_last = name_last;
		this.name_first = name_first;
	}
}

import groceryStore from "./store";

export async function createAccount(email, password, name_last, name_first) {
	console.log(email, password, name_last, name_first);
	return fetch("https://test.kennedyadams.ca/services/create_account.php", {
		method: "post",
		body: JSON.stringify({
			email: email,
			password: password,
			name_last: name_last,
			name_first: name_first,
		}),
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
}

export async function loginAccount(email, password) {
	return fetch("https://test.kennedyadams.ca/services/login_account.php", {
		method: "post",
		body: JSON.stringify({
			email: email,
			password: password,
		}),
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
}

export async function logoutAccount() {
	return fetch("https://test.kennedyadams.ca/services/logout_account.php", {
		method: "post",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
}

export async function resetPassword(id, code, password) {
	return fetch("https://test.kennedyadams.ca/services/reset_password.php", {
		method: "post",
		body: JSON.stringify({
			password: password,
			id: id,
			code: code,
		}),
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
}

export async function sendResetPasswordEmail(email) {
	return fetch("https://test.kennedyadams.ca/services/send_reset_password.php", {
		method: "post",
		body: JSON.stringify({
			email: email,
		}),
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
}

//returns user if valid and extends session
export async function getSession() {
	return fetch("https://test.kennedyadams.ca/services/get_session.php", {
		method: "get",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
}

function setSessionLocal(sessionID) {
	localStorage.setItem("sessionID", sessionID);
}
