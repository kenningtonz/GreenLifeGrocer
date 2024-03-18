import { getProducts } from "@/lib/classes/category";

import Products from "@/components/products";

import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SortSelect from "@/components/sortSelect";
import Search from "@/components/search";

import { getCategories, getFamilies } from "@/lib/classes/category";

export default async function Departments({ departmentURL, subDepartmentURL }) {
	const departments = await getCategories();

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

	const subDepartments =
		activeDepartment != undefined ? await getFamilies(activeDepartment.id) : null;

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

				<section className='p-4 flex flex-col gap-4 items-end'>
					<Search />
					<SortSelect />
				</section>
			</section>
			{activeDepartment != undefined ? <Products products={products} /> : null}
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
