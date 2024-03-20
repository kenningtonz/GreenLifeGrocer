import Image from "next/image";
import { Button } from "@/components/ui/button";
import { QuantityButton } from "@/components/quantityButton";
import { getProduct, getProducts } from "@/lib/classes/category";
import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import Rating from "@/components/rating";
import ProductsCarousel from "@/components/products/productsCarousel";

async function Product({ params }) {
	const url = params.product;
	const upc = url.split("_")[1];

	const product = await getProduct(upc);

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
		product_name,
		brand,
		avg_price,
		stars,
		product_description,
		category_name,
		family_name,
		category_url,
		family_url,
	} = product.products[0];

	const similarProducts = await getProducts(0, product.products[0].family_id);
	console.log(product);

	console.log(similarProducts);

	const rating = [];
	for (let i = 0; i < stars; i++) {
		rating.push(
			<Image key={i} src='/images/star.svg' alt='star' width={30} height={30} />
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

			<Image
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
				<span className='flex justify-between'>
					<QuantityButton className='child50' />

					<Button variant='default' className='shadow-md child50'>
						Add to Cart
					</Button>
				</span>
			</section>
			<section className='child100  p-4 rounded-2xl shadow-md bg-olive-200 shadow-olive-600/50'>
				<p className='text-base'>{product_description}</p>
			</section>

			<section className='child100 mt-8 '>
				<h2 className='text-2xl text-green-900'>Similar Products</h2>
				<ProductsCarousel
					products={similarProducts.filter((product) => product.upc != upc)}
				/>
			</section>
		</main>
	);
}

export default Product;
