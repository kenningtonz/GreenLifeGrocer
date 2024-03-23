import { Button } from "@/components/ui/button";
import { QuantityButton } from "@/components/quantityButton";
import { getProduct, getProducts } from "@/lib/classes/product";
import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import Rating from "@/components/rating";
import ProductsCarousel from "@/components/products/productsCarousel";
import { Suspense } from "react";
async function Product({ params }) {
	const url = params.product;

	const product = await getProduct(url);
	console.log(product);

	if (product.error.id != "0") {
		return (
			<main className='bg-white p-8'>
				<section className=' rounded-2xl shadow-md bg-olive-200 shadow-olive-600/50 p-4 '>
					<h1 className=''>Product Not Found</h1>
					<p>Sorry, we could not find the product you are looking for</p>
					<Link href='/departments' className='underline'>
						Back to Departments
					</Link>
				</section>
			</main>
		);
	}
	const {
		upc,
		product_name,
		brand,
		avg_price,
		stars,
		product_description,
		category_name,
		family_name,
		category_url,
		family_url,
		family_id,
		category_id,
	} = product.products[0];

	const similarProducts = await getProducts(category_id, family_id);
	// console.log(product);

	// console.log(similarProducts);

	const rating = [];
	for (let i = 0; i < stars; i++) {
		rating.push(
			<img key={i} src='/images/star.svg' alt='star' width={30} height={30} />
		);
	}
	return (
		<main className='bg-white flex gap-4 flex-wrap  p-8 justify-between  mb-8'>
			<Breadcrumbs
				sameSize={true}
				paths={[
					["Grocery", "grocery"],
					[category_name, category_url],
					[family_name, family_url],
					[product_name, url],
				]}
				className={"child100 mb-8"}
			/>

			<img
				className='child30 object-contain h-auto '
				src={`/images/product/${upc.slice(0, 4)}/${upc}.jpg`}
				alt={product_name}
				width={300}
				height={300}
			/>
			<section className='child50 p-4  flex flex-col justify-between  rounded-2xl shadow-md bg-olive-200 shadow-olive-600/50'>
				<h1 className='text-3xl font-semibold text-green-900'>{product_name}</h1>
				<h2 className='text-2xl text-green-900/80'>{brand}</h2>

				<Rating num={stars} />

				<p className='text-right text-2xl'>${avg_price}</p>

				<QuantityButton
					className='child50'
					isCart={false}
					product={product.products[0]}
				/>
			</section>
			<section className='child100  p-4 rounded-2xl shadow-md bg-olive-200 shadow-olive-600/50'>
				<p className='text-base'>{product_description}</p>
			</section>

			<section className='child100 mt-8 '>
				<h2 className='text-2xl text-green-900'>Similar Products</h2>
				<Suspense fallback='loading...'>
					<ProductsCarousel
						products={similarProducts.products.filter(
							(product) => product.upc != upc
						)}
					/>
				</Suspense>
			</section>
		</main>
	);
}

export default Product;
