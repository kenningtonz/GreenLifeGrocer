"use client";
import { createContext, useContext, useState } from "react";

const Context = createContext();

export function CartProvider({ cart: initialCart, children }) {
	const [cart, setCart] = useState(initialCart);
	return <Context.Provider value={[cart, setCart]}>{children}</Context.Provider>;
}

export function useCartContext() {
	return useContext(Context);
}
