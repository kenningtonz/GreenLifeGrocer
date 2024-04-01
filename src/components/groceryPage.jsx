import { getProducts } from "@/lib/classes/product";

import ProductsPaged from "@/components/products/productsPaged";
import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SortSelect from "@/components/sortSelect";
import { fetchData } from "@/lib/db";
import { Suspense } from "react";
import { getCategories, getFamilies } from "@/lib/classes/category";
import Loading from "@/components/loader";

import Error from "@/components/error";

export default async function GroceryPage({ departmentURL, subDepartmentURL }) {
	const departmentsData = await fetchData(getCategories);

	if (typeof departmentsData === "string") {
		return (
			<main className='mainGreenCenter'>
				<Error error={departmentsData}>
					<Link href='/' className='underline'>
						Back to Home
					</Link>
				</Error>
			</main>
		);
	}
	const departments = departmentsData.categories;

	const activeDepartment = departments.find(
		(department) => department.url === departmentURL
	);

	if (activeDepartment === undefined) {
		return (
			<main className='mainGreenCenter'>
				<Error error={"Department Not Found"}>
					<Link href='/grocery' className='underline'>
						Back to Departments
					</Link>
				</Error>
			</main>
		);
	}

	const subDepartmentsData =
		activeDepartment != undefined
			? await fetchData(getFamilies, activeDepartment.id)
			: null;

	if (typeof subDepartmentsData === "string") {
		return (
			<Error error={subDepartmentsData}>
				<Link href={`/grocery`} className='underline'>
					Back to Departments
				</Link>
			</Error>
		);
	}

	const subDepartments = subDepartmentsData.families ?? null;

	const activeSubDepartment =
		subDepartments != null
			? subDepartments.find((sub) => sub.url === subDepartmentURL)
			: null;

	const productsData =
		activeSubDepartment != undefined
			? await fetchData(getProducts, activeDepartment.id, activeSubDepartment.id)
			: await fetchData(getProducts, activeDepartment.id);

	return (
		<main className='bg-olive-50'>
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

			<section className='flex flex-wrap justify-between p-8 gap-4 '>
				<Breadcrumbs
					sameSize={false}
					className={"child50  "}
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

				<SortSelect />
			</section>
			{activeDepartment != undefined && typeof productsData != "string" ? (
				<Suspense fallback={<Loading />}>
					<ProductsPaged products={productsData.products} />
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
