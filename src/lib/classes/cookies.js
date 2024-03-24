import { db, dbBody } from "@/lib/db";
export async function getCookie(name) {
	return fetch(
		`${db}/get_cookie.php`,
		dbBody({
			name: name,
		})
	).then((res) => res.json());
}

export async function setCookie(name, value, seconds) {
	return fetch(
		`${db}/set_cookie.php`,
		dbBody({
			name: name,
			value: value,
			seconds: seconds,
		})
	);
}
