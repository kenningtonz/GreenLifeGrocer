"use server";
import { cookies } from "next/headers";

export async function setSessionCookie(sessionID) {
	const cookieStore = cookies();
	cookieStore.set("sessionID", sessionID, {
		expires: 60 * 60 * 24 * 7,
		path: "/",
		sameSite: "none",
		secure: true,
	});
	return cookieStore.get("sessionID");
}

export async function getSessionCookie() {
	const cookieStore = cookies();
	return cookieStore.get("sessionID");
}

// export async function getCookie(name) {
// 	return fetch("https://test.kennedyadams.ca/services/get_cookie.php", {
// 		method: "POST",
// 		body: JSON.stringify({ name: name }),
// 		headers: {
// 			accept: "application/json",
// 			"Content-Type": "application/json",
// 		},
// 	}).then((res) => res.json());
// }

// export async function setCookie(name, value, seconds) {
// 	return fetch("https://test.kennedyadams.ca/services/set_cookie.php", {
// 		method: "POST",
// 		body: JSON.stringify({ name: name, value: value, seconds: seconds }),
// 		headers: {
// 			accept: "application/json",
// 			"Content-Type": "application/json",
// 		},
// 	}).then((res) => res.json());
// }
