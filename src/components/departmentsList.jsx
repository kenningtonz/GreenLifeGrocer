import { getFamilies, getCategories } from "@/lib/classes/category";
import Image from "next/image";
import Link from "next/link";
async function Departments() {
	const categories = await getCategories();
	// const families = await getFamilies("Bakery");
	console.log(categories);

	return (
		<section className='bg-green-gradient w-full'>
			<h2 className='text-3xl text-center text-green-900'>Departments</h2>
			<ul className='flex gap-4 flex-wrap p-2 mb-12'>
				{categories.map((department) => {
					return (
						<li
							className='child30 max-h-[140px] relative shadow-md rounded-xl overflow-hidden'
							key={department.name}
						>
							<Link href={`/grocery/${department.url}`}>
								<h3 className='text-2xl text-white absolute text-center w-full top-[40%] z-10'>
									{department.name}
								</h3>
								<Image
									className='object-center brightness-75 object-contain z-0'
									src={`/images/departments/${department.url}.jpg`}
									alt={department.name}
									width={480}
									height={300}
								/>
							</Link>
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default Departments;
