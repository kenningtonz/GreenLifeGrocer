import { QuantityButton } from "@/components/quantityButton";
import { getProduct, getProducts } from "@/lib/classes/product";
import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import Rating from "@/components/rating";
import ProductsCarousel from "@/components/products/productsCarousel";
import { Suspense } from "react";
import { fetchData } from "@/lib/db";

import { db } from "@/lib/db";

import Image from "next/image";
async function Product({ params }) {
	const url = params.product;
	const productData = await fetchData(getProduct, url);

	if (typeof productData === "string") {
		return (
			<main className='bg-white p-8'>
				<section className='flex flex-col items-center rounded-2xl shadow-md bg-olive-200 shadow-olive-600/50 p-4 '>
					<p className='text-center text-lg mb-4'>
						Sorry, we could not find the product you are looking for
					</p>
					<Link href='/departments' className='underline text-center'>
						Back to Departments
					</Link>
				</section>
			</main>
		);
	}

	const {
		upc,
		id,
		product_name,
		brand,
		avg_price,
		stars,
		unit,
		product_description,
		category_name,
		family_name,
		category_url,
		family_url,
		family_id,
		category_id,
	} = productData.products[0];

	const similarProductsData = await fetchData(
		getProducts,
		category_id,
		family_id
	);

	// console.log(product);

	// console.log(similarProducts);

	return (
		<main className='bg-white flex gap-4 flex-wrap sm:px-8 py-8 px-4 justify-between  mb-8'>
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

			<Image
				className='child30 object-contain h-auto '
				src={`${db}/images/product/${upc.slice(0, 4)}/${upc}.jpg`}
				alt={product_name}
				width={300}
				height={300}
			/>
			<section className='child50 p-4  flex flex-col justify-between  rounded-2xl shadow-md bg-olive-200 shadow-olive-600/50'>
				<h1 className='text-3xl font-semibold text-green-900'>{product_name}</h1>
				<h2 className='text-2xl text-green-900/80'>{brand}</h2>

				<Rating num={stars} />

				<div className='flex flex-wrap gap-4 justify-center sm:justify-between items-center'>
					<p className='text-right text-xl '>
						${avg_price} / {unit}
					</p>

					<QuantityButton className='' isCart={false} id={id} name={product_name} />
				</div>
			</section>
			<section className='child100  p-4 rounded-2xl shadow-md bg-olive-200 shadow-olive-600/50'>
				<p className='text-base'>{product_description}</p>
			</section>

			{typeof productData != "string" ? (
				<section className='child100 mt-8 '>
					<h2 className='text-2xl text-green-900'>Similar Products</h2>
					<Suspense fallback='loading...'>
						<ProductsCarousel
							products={similarProductsData.products.filter(
								(product) => product.upc != upc
							)}
						/>
					</Suspense>
				</section>
			) : null}
		</main>
	);
}

export default Product;
