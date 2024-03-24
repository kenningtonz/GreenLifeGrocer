import { getFamilies, getCategories } from "@/lib/classes/category";
import Link from "next/link";
import Image from "next/image";
async function DepartmentsList() {
	const departmentsPHP = await getCategories();
	const { categories: departments, error } = departmentsPHP;
	console.log(departmentsPHP);
	// const families = await getFamilies("Bakery");
	if (error.id !== "0") {
		return (
			<section className='bg-white p-8'>
				<h1 className='text-2xl text-center'>Departments Not Found</h1>
				<p className='text-center'>Sorry, we could not find the departments</p>
			</section>
		);
	}

	return (
		<section className=' w-full p-4 py-8 max-w-5xl'>
			<h2 className='text-3xl text-center text-green-900 mb-4'>
				Shop by Department
			</h2>
			<ul className='flex gap-4 flex-wrap p-2 mb-12 justify-center'>
				{departments.map((department) => {
					return (
						<li key={department.name}>
							<Link
								href={`/grocery/${department.url}`}
								className='curser-pointer h-28 w-28 p-1 shadow-md rounded-full  flex flex-col justify-center items-center  hover:scale-105   bg-olive/50  transition-all   hover:bg-olive/80'
							>
								<Image
									className='w-auto'
									src={`/images/icons/${department.url}.png`}
									alt={department.name}
									width={42}
									height={42}
								/>
								<h3 className='text-base text-green-900  text-center w-full'>
									{department.name}
								</h3>
							</Link>
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default DepartmentsList;
