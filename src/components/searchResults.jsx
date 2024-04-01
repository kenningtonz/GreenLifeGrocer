import ProductCard from "@/components/products/productCard";
import { getSearch } from "@/lib/classes/search";
import { fetchData } from "@/lib/db";

export default async function SearchResults({ search }) {
	const searchData = await fetchData(getSearch, search);

	if (typeof searchData === "string") {
		return (
			<section className=' p-8'>
				<h1 className='text-2xl text-center'>Search Not Found</h1>
				<p className='text-center'>{searchData}</p>
			</section>
		);
	}

	return (
		<main className='mainGreenCenter px-4 py-8'>
			<section className={`mt-12 mb-8 w-full `}>
				<h2 className='text-3xl text-center text-green-900 mb-8'>
					Search Results for &quot;{search}&quot;
				</h2>
				<div className='flex flex-wrap gap-6 justify-center'>
					{searchData.products.map((product, index) => {
						return (
							<div
								key={`${index}-${product.product_name}`}
								className='min-w-48 max-w-64 flex-1'
							>
								<ProductCard product={product} index={index} className={"h-full"} />
							</div>
						);
					})}
				</div>
			</section>
		</main>
	);
}
