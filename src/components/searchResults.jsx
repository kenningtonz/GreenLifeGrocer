import ProductCard from "@/components/products/productCard";
import { getSearch } from "@/lib/classes/search";
import { Suspense } from "react";

export default async function SearchResults({ search }) {
	const searchPHP = await getSearch(search);

	const { products, error } = searchPHP;
	console.log(searchPHP);
	// const session = getSessionCookie();
	// console.log(session);
	return (
		<main className='mainGreenCenter px-4 py-8'>
			<section className={`mt-12 mb-8 w-full `}>
				<h2 className='text-3xl text-center text-green-900 mb-8'>
					Search Results for &quot;{search}&quot;
				</h2>
				<div className='flex flex-wrap gap-6'>
					{error.id === "0" ? (
						<>
							{products.map((product, index) => {
								return (
									<div
										key={`${index}-${product.product_name}`}
										className='min-w-48 max-w-64 flex-1'
									>
										<ProductCard product={product} index={index} className={"h-full"} />
									</div>
								);
							})}
						</>
					) : (
						<p className='text-center'>Sorry, we could not find the products</p>
					)}
				</div>
			</section>
		</main>
	);
}
