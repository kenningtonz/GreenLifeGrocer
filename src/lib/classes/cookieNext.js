"use server";
import { cookies } from "next/headers";

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

export async function setNextCookie(name, value) {
	const cookieStore = cookies();
	cookieStore.set(name, value, {
		expires: 60 * 60 * 24 * 7,
		path: "/",
		sameSite: "none",
		secure: true,
	});
	return cookieStore.get("sessionID");
}

export async function getNextCookie(name) {
	const cookieStore = cookies();
	return cookieStore.get(name);
}
