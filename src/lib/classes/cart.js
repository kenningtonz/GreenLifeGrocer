import { unstable_batchedUpdates } from "react-dom";
import groceryStore from "./store";

import { db, dbBody } from "@/lib/db";

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
