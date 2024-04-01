"use client";

import Cookies from "js-cookie";

export async function setCookie(name, value) {
	const setNextCookie = () => {
		Cookies.set(name, value, {
			expires: 1,
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

export async function deleteCookie(name) {
	const deleteNextCookie = () => {
		Cookies.remove(name);
		console.log(name, "cookie deleted");
	};
	return deleteNextCookie();
}
