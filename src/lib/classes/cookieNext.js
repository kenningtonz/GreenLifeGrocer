"use client";

import Cookies from "js-cookie";

export async function setCookie(name, value) {
	const setNextCookie = () => {
		Cookies.set(name, value, {
			maxAge: 60 * 60 * 24,
			path: "/",
			httpOnly: false,
		});
		console.log(name, "cookie set");
	};
	return setNextCookie();
}

export async function getCookie(name) {
	return Cookies.get(name);
}
