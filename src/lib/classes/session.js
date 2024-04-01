"use server";

import { cookies } from "next/headers";
import { db, dbBody } from "@/lib/db";

export async function getSession() {
	const session_id = cookies().get("session")?.value;
	console.log(session_id);
	const data = session_id
		? await fetch(`${db}/get_session.php`, dbBody({ session_id: session_id }))
				.then((res) => res.json())
				.then((ress) => console.log("data", ress))
		: null;
	if (data != null && data.error.id === "0") {
		//extend session
		console.log("data", data);
		return data;
	}
	return null;
}

export async function logoutAccount() {
	const session_id = cookies().get("session")?.value;
	cookies().delete("session");
	return fetch(
		`${db}/logout_account.php`,
		dbBody({
			session: session_id,
		})
	).then((res) => res.json());
}
