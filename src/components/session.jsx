"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function SetSession(session) {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const setCookie = (session) => {
		Cookies.set("session", session, {
			expires: 60 * 60 * 3,
			path: "/",
			httpOnly: true,
		});
		console.log("Session set");
	};
	if (!isMounted) {
		return null;
	}
	return <>{setCookie(session)}</>;
}

export default SetSession;
