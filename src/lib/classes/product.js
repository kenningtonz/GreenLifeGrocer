export async function getProducts(category = "Bakery") {
	return fetch("https://test.kennedyadams.ca/services/get_products.php", {
		method: "POST",
		body: JSON.stringify({ category_name: category }),
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
}
