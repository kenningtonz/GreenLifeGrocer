class User {
	constructor(email, password, name_last, name_first) {
		this.email = email;
		this.password = password;
		this.name_last = name_last;
		this.name_first = name_first;
	}
}

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
