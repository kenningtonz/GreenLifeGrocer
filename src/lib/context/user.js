"use client";
import { createContext, useContext, useState } from "react";

const Context = createContext();

export function UserProvider({ user: initialUser, children }) {
	const [user, setUser] = useState(initialUser);
	return <Context.Provider value={[user, setUser]}>{children}</Context.Provider>;
}

export function useUserContext() {
	return useContext(Context);
}
