import { getFamilies, getCategories } from "@/lib/classes/category";
import Link from "next/link";
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
		<section className=' w-full'>
			<h2 className='text-3xl text-center text-green-900'>Shop by Department</h2>
			<ul className='flex gap-4 flex-wrap p-2 mb-12 justify-center'>
				{departments.map((department) => {
					return (
						<li key={department.name}>
							<Link
								href={`/grocery/${department.url}`}
								className='curser-pointer h-28 w-28 p-1 shadow-md rounded-full flex justify-center items-center  hover:scale-105   bg-olive/50  transition-all   hover:bg-olive/80'
							>
								<h3 className='text-xl text-green-900  text-center w-full'>
									{department.name}
								</h3>
								{/* <Image
									className='object-center brightness-75 object-contain z-0'
									src={`/images/departments/${department.url}.jpg`}
									alt={department.name}
									width={480}
									height={300}
								/> */}
							</Link>
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default DepartmentsList;
