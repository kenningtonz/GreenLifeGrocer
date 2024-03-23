// "use server";
// import { cookies } from "next/headers";

// export async function setSessionCookie(sessionID) {
// 	const cookieStore = cookies();
// 	cookieStore.set("sessionID", sessionID, {
// 		expires: 60 * 60 * 24 * 7,
// 		path: "/",
// 		sameSite: "none",
// 		secure: true,
// 	});
// 	return cookieStore.get("sessionID");
// }

// export async function getSessionCookie() {
// 	const cookieStore = cookies();
// 	return cookieStore.get("sessionID");
// }

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
