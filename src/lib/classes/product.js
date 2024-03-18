export class Product {
	/**
	 * @param {string} id
	 * @param {string} name
	 * @param {number} familyID
	 * @param {string} brand
	 * @param {string} upc
	 * @param {string} description
	 * @param {number} price
	 * @param {boolean} taxable
	 * @param {string} unit
	 * @param {number} stars
	 * @param {string} category
	 * @param {string} url
	 */

	constructor(
		id,
		name,
		familyID,
		brand,
		upc,
		description,
		price,
		taxable,
		unit,
		stars,
		category,
		url
	) {
		this.id = id;
		this.name = name;
		this.familyID = familyID;
		this.brand = brand;
		this.upc = upc;
		this.description = description;
		this.price = price;
		this.taxable = taxable;
		this.unit = unit;
		this.stars = stars;
		this.category = category;
		this.url = url;
	}
}

export class ProductList {
	/**
	 * @param {Product[]} products
	 */
	constructor(products) {
		this.products = [];
		for (let product of products) {
			this.products.push(
				new Product(
					product.id,
					product.name,
					product.familyID,
					product.brand,
					product.upc,
					product.description,
					product.price,
					product.taxable,
					product.unit,
					product.stars,
					product.category,
					product.url
				)
			);
		}
	}
}
export async function getProds() {
	// Fetch data from external API
	// const res = await fetch("/services/get_categories.php", {
	// 	method: "GET",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// 	// body: JSON.stringify({}),
	// });
	// if (!res.ok) {
	// 	// This will activate the closest `error.js` Error Boundary
	// 	throw new Error("Failed to fetch data");
	// }
	// const getCat = $.ajax({
	// 	url: "/services/get_categories.php",
	// 	type: "GET",
	// 	dataType: "json",
	// });
	// getCat.fail(function (jqXHR, textStatus) {
	// 	alert("Something went Wrong! (getCat)" + textStatus);
	// });
	// getCat.done(function (categories) {
	// 	console.log(categories);
	// });
	// try {
	// 	const request = await fetch("/services/get_categories.php", {
	// 		method: "GET",
	// 		headers: {
	// 			accept: "application/json",
	// 			"Content-Type": "application/json",
	// 		},
	// 	});
	// 	const result = await request.text();
	// 	console.log(result);
	// } catch (error) {
	// 	console.error(error);
	// }
	// fetch("", {
	// 	method: "GET",
	// 	headers: {
	// 		accept: "application/json",
	// 		"Content-Type": "application/json",
	// 	},
	// })
	// 	.then((response) => {
	// 		console.log(response);
	// 		return response.text();
	// 	})
	// 	.then((res) => {
	// 		console.log(res);
	// 		if (res.status === 201) {
	// 			console.log("Post successfully created!");
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.log(error);
	// 	});
	// return res.json();
	// const res = fetch("https://jsonplaceholder.typicode.com/posts", {
	// 	met
	// 	headers: {
	// 		Accept: "application/json",
	// 		"Content-Type": "application/json",
	// 	},
	// });
	// return res.json();
}

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
