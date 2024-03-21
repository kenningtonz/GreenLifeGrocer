import { ProductList } from "./product";

export async function getCategories() {
	return fetch("https://test.kennedyadams.ca/services/get_categories.php", {
		method: "get",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
	}).then((res) => res.json().then((data) => data.categories));
}

// const categories = ;

export async function getProducts(category, family = null) {
	return fetch("https://test.kennedyadams.ca/services/get_products.php", {
		method: "POST",
		body: JSON.stringify({ category_id: category, family_id: family }),
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
	}).then((res) => res.json().then((data) => data.products));
}

export async function getProduct(url) {
	return fetch("https://test.kennedyadams.ca/services/get_product.php", {
		method: "POST",
		body: JSON.stringify({ url: url }),
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
}

export async function getFamilies(category) {
	console.log(category);
	return fetch("https://test.kennedyadams.ca/services/get_families.php", {
		method: "POST",
		body: JSON.stringify({ category_id: category }),
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
	}).then((res) => res.json().then((data) => data.families));
}
// export async function getProducts(department) {
// 	const data = await getCategories();

// 	async function get() {
// 		const productsDepartment = {};
// 		departmentsObject.getIDs(department).forEach((id) => {
// 			const url = data.categories.find((cat) => cat.id == id).url;
// 			const name = data.categories.find((cat) => cat.id == id).name;
// 			getProductsCategory(url).then((products) => {
// 				productsDepartment[id] = { name, products: products.products };
// 				// productsDepartment.push(products.products);
// 			});
// 		});
// 		return productsDepartment;
// 	}

// 	// console.log(productsDepartment);
// 	return await get();

// 	// return
// }

class Category {
	constructor(name, id, url) {
		this.name = name;
		this.id = id;
		this.url = url;
	}
}

class Categories {
	constructor(departments) {
		this.departments = [];
		for (let department of departments) {
			this.departments.push(
				new Category(department.name, department.id, department.url)
			);
		}
	}
}
export let categories;
export const departmentInit = async () => {
	categories = await getCategories().then((data) => {
		console.log("init");
		return data.categories;
	});
};

class Department {
	constructor(name, ids, url, img) {
		this.name = name;
		this.ids = ids;
		this.url = url;
		this.img = img;
	}

	setSubDepartments(subDepartments) {
		this.subDepartments = subDepartments;
	}
}

class SubDepartment {
	constructor(name, id, url, img) {
		this.name = name;
		this.id = id;
		this.url = url;
		this.img = img;
	}
}

// enum Departments {
//     Pantry = 'Pantry',
//     Bakery = 'Bakery',
//     MilkDairy = 'Milk & Dairy',
//     MeatSeafood = 'Meat & Seafood',
//     Frozen = 'Frozen',
//     Household = 'Household',
//     Health = 'Health',
//     Other = 'Other',
//     Produce = 'Produce'

// }

export const departmentsObject = {
	departments: [
		{
			name: "Pantry",
			subIDs: [3, 5, 6, 9, 13, 14, 24, 31],
			url: "pantry",
			img: "/images/departments/pantry.png",
		},
		{
			name: "Bakery",
			subIDs: [15],
			subIDsFamily: true,
			familySubIDs: [23, 24, 25, 26, 27],
			url: "bakery",
			img: "/images/departments/bakery.png",
		},
		{
			name: "Milk & Dairy",
			subIDs: [20],
			url: "milkanddairy",
			img: "/images/departments/dairyandeggs.png",
		},
		{
			name: "Meat & Seafood",
			subIDs: [19, 28, 11],
			url: "meatandseafood",
			img: "/images/departments/meat.png",
		},
		{
			name: "Frozen",
			subIDs: [15],
			subIDsFamily: true,
			familySubIDs: [17, 15, 14, 13, 12, 11, 10, 9],
			url: "frozen",
			img: "/images/departments/frozen.png",
		},
		{
			name: "Household",
			subIDs: [7, 23],
			url: "household",
			img: "/images/departments/household.png",
		},
		{
			name: "Health",
			subIDs: [18, 33],
			url: "health",
			img: "/images/departments/health.png",
		},
		{
			name: "Other",
			subIDs: [1, 25],
			url: "other",
			img: "/images/departments/other.png",
		},
		{
			name: "Produce",
			subIDs: [26],
			subIDsFamily: true,
			familySubIDs: [1, 2, 3, 4, 5, 6, 19, 18],
			url: "produce",
			img: "/images/departments/produce.png",
		},
	],

	getDepartment(id) {
		for (let department of this.departments) {
			if (department.subIDs.includes(id)) {
				return department.name;
			}
		}
	},

	getIDs(departmentName) {
		for (let department of this.departments) {
			if (department.name === departmentName) {
				return department.subIDs;
			}
		}
	},
};

// 0
// :
// {id: '1', name: 'Baby Food & Supplies', url: 'BabyFood&Supplies'}
// 1
// :
// {id: '2', name: 'Bakery', url: 'Bakery'}
// 2
// :
// {id: '3', name: 'Baking Supplies', url: 'BakingSupplies'}
// 3
// :
// {id: '5', name: 'Canned Goods', url: 'CannedGoods'}
// 4
// :
// {id: '6', name: 'Cereal', url: 'Cereal'}
// 5
// :
// {id: '7', name: 'Cleaning Products', url: 'CleaningProducts'}
// 6
// :
// {id: '9', name: 'Condiments & Sauces', url: 'Condiments&Sauces'}
// 7
// :
// {id: '11', name: 'Deli', url: 'Deli'}
// 8
// :
// {id: '13', name: 'Drinks and Snacks', url: 'DrinksandSnacks'}
// 9
// :
// {id: '14', name: 'Dry Goods', url: 'DryGoods'}
// 10
// :
// {id: '15', name: 'Frozen', url: 'Frozen'}
// 11
// :
// {id: '18', name: 'Health & Beauty', url: 'Health&Beauty'}
// 12
// :
// {id: '19', name: 'Meat & Poultry', url: 'Meat&Poultry'}
// 13
// :
// {id: '20', name: 'Milk & Dairy', url: 'Milk&Dairy'}
// 14
// :
// {id: '23', name: 'Paper & Plastic', url: 'Paper&Plastic'}
// 15
// :
// {id: '24', name: 'Pasta', url: 'Pasta'}
// 16
// :
// {id: '25', name: 'Pet Supplies', url: 'PetSupplies'}
// 17
// :
// {id: '26', name: 'Produce', url: 'Produce'}
// 18
// :
// {id: '28', name: 'Seafood', url: 'Seafood'}
// 19
// :
// {id: '31', name: 'Spices', url: 'Spices'}
// 20
// :
// {id: '33', name: 'Vitamins & Supplements', url: 'Vitamins&Supplements'}

// enum Departments

let departments = [
	{ name: "Produce" },
	{ name: "Pantry" },
	{ name: "Bakery" },
	{ name: "Dairy & Eggs" },
	{ name: "Meat & Seafood" },
	{ name: "Frozen" },
	{ name: "Household" },
	{ name: "Health & Beauty" },
	{ name: "Other" },
];
