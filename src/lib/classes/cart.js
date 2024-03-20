export const addToCart = (product, quantity) => {
	//local
	const cart = getCart() || {};
	if (cart[product.upc]) {
		cart[product.upc].quantity += quantity;
	} else {
		cart[product.upc] = { product, quantity };
	}
	setCart(cart);
};

export const getCart = () => {
	//local
	return JSON.parse(localStorage.getItem("cart"));
};

export const setCart = (cart) => {
	//local
	localStorage.setItem("cart", JSON.stringify(cart));
};
