import { getProducts } from "@/lib/classes/product";

import ProductsPaged from "@/components/products/productsPaged";
import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SortSelect from "@/components/sortSelect";
import Search from "@/components/search";
import { Suspense } from "react";
import { getCategories, getFamilies } from "@/lib/classes/category";

export default async function GroceryPage({ departmentURL, subDepartmentURL }) {
	const departmentsPHP = await getCategories();
	const { categories: departments, error: departmentE } = departmentsPHP;
	console.log(departments);

	if (departmentE.id !== "0") {
		return (
			<section className='bg-white p-8'>
				<h1 className='text-2xl text-center'>Departments Not Found</h1>
				<p className='text-center'>Sorry, we could not find the departments</p>
			</section>
		);
	}

	const activeDepartment = departments.find(
		(department) => department.url === departmentURL
	);

	if (activeDepartment === undefined) {
		return (
			<main>
				<section className=' rounded-lg bg-white shadow-sm p-4 '>
					<h1 className=''>Department Not Found</h1>
					<p>Sorry, we could not find the department you are looking for</p>
					<Link href='/grocery' className='underline'>
						Back to Departments
					</Link>
				</section>
			</main>
		);
	}

	const subDepartmentsPHP =
		activeDepartment != undefined ? await getFamilies(activeDepartment.id) : null;

	const { categories: subDepartments, error: subDepartmentE } =
		subDepartmentsPHP != null
			? subDepartmentsPHP
			: { categories: null, error: { id: "1" } };

	console.log(subDepartments);

	const activeSubDepartment =
		subDepartments != null
			? subDepartments.find((sub) => sub.url === subDepartmentURL)
			: null;

	const products =
		activeSubDepartment != undefined
			? await getProducts(activeDepartment.id, activeSubDepartment.id)
			: await getProducts(activeDepartment.id);

	//TODO: if subdepartment is not found
	return (
		<main>
			<DepartmentButtons
				departments={departments}
				activeDepartment={activeDepartment}
				currentURL={`/grocery`}
			/>

			<DepartmentButtons
				departments={subDepartments}
				activeDepartment={activeSubDepartment}
				currentURL={`/grocery/${activeDepartment.url}`}
			/>

			<section className='flex spaceBetween p1 '>
				<Breadcrumbs
					sameSize={false}
					className={"child50 p-8 "}
					paths={
						activeSubDepartment != undefined
							? [
									["Grocery", "grocery"],
									[activeDepartment.name, activeDepartment.url],
									[activeSubDepartment.name, activeSubDepartment.url],
							  ]
							: [
									["Grocery", "grocery"],
									[activeDepartment.name, activeDepartment.url],
							  ]
					}
				/>

				<section className='p-6 flex flex-col gap-4 items-end'>
					<Search />
					<SortSelect />
				</section>
			</section>
			{activeDepartment != undefined ? (
				<Suspense fallback='loading...'>
					<ProductsPaged products={products.products} />
				</Suspense>
			) : null}
		</main>
	);
}

const DepartmentButtons = ({ departments, activeDepartment, currentURL }) => {
	return (
		<nav className=' flex justify-stretch flex-wrap my-2'>
			{departments.map((department) => {
				return (
					<Button
						asChild
						key={`${department.name}-button`}
						variant='green'
						className=' flex-auto join-item'
						rounded='none'
						data-active={department.name === activeDepartment?.name}
					>
						<Link
							href={
								department.name === activeDepartment?.name
									? currentURL
									: `${currentURL}/${department.url}`
							}
						>
							{department.name}
						</Link>
					</Button>
				);
			})}
		</nav>
	);
};
