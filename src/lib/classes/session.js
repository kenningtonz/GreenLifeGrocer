"use server";

import { cookies } from "next/headers";
import { db, dbBody } from "@/lib/db";

export async function setSession(sessionID) {
	cookies().set("session", sessionID, {
		httpOnly: true,
		// secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24 * 7, // One week
		path: "/",
	});
	// Redirect or handle the response after setting the cookie
}

export async function getSession(session_id) {
	// const session_id = cookies().get("session")?.value;
	// console.log(session_id);
	return fetch(`${db}/get_session.php`, dbBody({ session_id: session_id })).then(
		(res) => res.json()
	);
}
