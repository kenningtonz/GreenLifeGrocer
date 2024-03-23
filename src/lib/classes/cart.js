import { unstable_batchedUpdates } from "react-dom";
import groceryStore from "./store";

import { db, dbBody } from "@/lib/db";

export const addToCart = (id, quantity) => {
	let cart;
	unstable_batchedUpdates(() => {
		cart = groceryStore.getState().cartArray;
	});
	//cart is array

	if (cart.map((item) => item.id).includes(id)) {
		const index = cart.findIndex((item) => item.id === id);
		cart[index].quantity += quantity;
	} else {
		cart.push({ id, quantity });
	}

	groceryStore.setState({ cart: cart });
};

export const removeFromCart = (id) => {
	let cartArray;
	unstable_batchedUpdates(() => {
		cartArray = groceryStore.getState().cartArray;
	});

	const index = cartArray.findIndex((item) => item.id === id);
	cartArray.splice(index, 1);

	groceryStore.setState({ cartArray: cartArray });
};

export async function getProductsByCart(cartArray) {
	return fetch(
		`${db}/get_products_by_cart.php`,
		dbBody({
			cart: cartArray,
		})
	).then((res) => res.json());
}

// export async function getCart() {
// 	return await getCookie("cart");
// }

// export async function setCart(cart) {
// 	return await setCookie("cart", cart, 60 * 60 * 24);
// }
