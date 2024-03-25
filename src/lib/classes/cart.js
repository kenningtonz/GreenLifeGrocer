import { db, dbBody } from "@/lib/db";

export async function getProductsByCart(cartArray) {
	return fetch(
		`${db}/get_products_by_cart.php`,
		dbBody({
			cart: cartArray,
		})
	).then((res) => res.json());
}

export async function setUserCart(cart, user_id) {
	return fetch(
		`${db}/set_cart.php`,
		dbBody({
			cart: cart,
			user_id: user_id,
		})
	).then((res) => res.json());
}

export async function completePurchase(cart, user_id) {
	return fetch(
		`${db}/complete_purchase.php`,
		dbBody({
			cart: cart,
			user_id: user_id,
		})
	).then((res) => res.json());
}
