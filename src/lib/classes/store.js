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
	cart: [],
	setCart: (cart) => set({ cart: cart }),
	addToCart: (product, quantity) => {
		const cart = getCart() || {};
		if (cart[product.upc]) {
			cart[product.upc].quantity += quantity;
		} else {
			cart[product.upc] = { product, quantity };
		}
		setCart(cart);
	},

	removeFromCart: (product) => {
		const cart = getCart();
		delete cart[product.upc];
		setCart(cart);
	},
}));

// process.env.user;

export default groceryStore;
