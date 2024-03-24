import Image from "next/image";
import { getSessionCookie } from "@/lib/classes/cookies";
import DepartmentsList from "@/components/departmentsList";
import { getRandomProducts } from "@/lib/classes/product";
import ProductCard from "@/components/products/productCard";
import { getSearch } from "@/lib/classes/search";
import { Suspense } from "react";
import { getSession } from "@/lib/classes/user";

export default async function Search({ params }) {
	const searchPHP = await getSearch(params.search);

	const { products, error } = searchPHP;
	console.log(searchPHP);
	// const session = getSessionCookie();
	// console.log(session);
	return (
		<main className='bg-olive-100 px-4 py-16 flex justify-center min-h-[90dvh]'>
			<section className={`mt-12 mb-8 w-full `}>
				<h2 className='text-3xl text-center text-green-900'>
					Search Results for {params.search}
				</h2>
				<div className='mt-2 flex gap-4 sm:flex-nowrap flex-wrap p-4 justify-evenly bg-half-green'>
					{error.id === "0" ? (
						<>
							{products.map((product) => {
								return (
									<ProductCard key={product.upc} product={product} className='w-64' />
								);
							})}
						</>
					) : (
						<p className='text-center'>Sorry, we could not find the products</p>
					)}
				</div>
			</section>

			<Suspense fallback={<div>Loading...</div>}></Suspense>
		</main>
	);
}
