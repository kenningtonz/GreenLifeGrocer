import { db, dbBody } from "@/lib/db";

export function saveLocal(session) {
	if (typeof window !== "undefined" && window.localStorage) {
		localStorage.setItem("session", session);
	}
}

export function getLocal() {
	if (typeof window !== "undefined" && window.localStorage) {
		return localStorage.getItem("session");
	}
}

export async function auth() {
	console.log("auth");
	if (typeof window !== "undefined" && window.localStorage) {
		const session = localStorage.getItem("session");
		console.log(session);
		fetch(`${db}/get_session.php`, dbBody({ session_id: session }))
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.error.id == 0) {
					return data.user.user;
				} else {
					return {};
				}
			});
	}
}
