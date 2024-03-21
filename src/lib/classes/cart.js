import { unstable_batchedUpdates } from "react-dom";
import groceryStore from "./store";

export const addToCart = (product, quantity) => {
	let cart;
	unstable_batchedUpdates(() => {
		cart = groceryStore.getState().cart;
	});

	if (cart[product.upc]) {
		cart[product.upc].quantity += quantity;
	} else {
		cart[product.upc] = { product, quantity };
	}
	groceryStore.setState({ cart: cart });
};

export const removeFromCart = (product) => {
	let cart;
	unstable_batchedUpdates(() => {
		cart = groceryStore.getState().cart;
	});

	delete cart[product.upc];
	groceryStore.setState({ cart: cart });
};
