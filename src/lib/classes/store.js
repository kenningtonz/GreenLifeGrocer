import { create } from "zustand";

const groceryStore = create((set) => ({
	activeSession: false,
	setActiveSession: (activeSession) => set({ activeSession: activeSession }),
	sessionID: "",
	setSessionID: (sessionID) => set({ sessionID: sessionID }),
	email: "",
	setEmail: (email) => set({ email: email }),
	user: {},
	setUser: (user) => set({ user: user }),
	cartArray: {},

	setCart: (cart) => set({ cart: cart }),
}));

// process.env.user;

export default groceryStore;
