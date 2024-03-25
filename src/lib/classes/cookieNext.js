"use client";

import Cookies from "js-cookie";

export async function setCookie(name, value) {
	const setNextCookie = () => {
		Cookies.set(name, value, {
			expires: 60 * 60 * 24,
			path: "/",
			httpOnly: true,
		});
		console.log(name, "cookie set");
	};
	return setNextCookie();
}

export async function getCookie(name) {
	return Cookies.get(name);
}
