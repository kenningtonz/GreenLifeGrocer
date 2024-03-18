import Image from "next/image";
import { Button } from "@/components/ui/button";
import { QuantityButton } from "@/components/quantityButton";
import { getProduct } from "@/lib/classes/category";
import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";

async function Product({ params }) {
	const url = params.product;
	const upc = url.split("_")[1];
	console.log(url);
	console.log(upc);

	const product = await getProduct(upc);
	console.log(product);
	if (product.error.id != "0") {
		return (
			<main className='bg-olive-100 p-8'>
				<section className=' rounded-lg bg-white shadow-sm p-4 '>
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

	return (
		<main className='bg-olive-100 flex gap-4 flex-wrap  p-8 justify-between '>
			<Breadcrumbs
				sameSize={true}
				paths={[
					["Grocery", "grocery"],
					[category_name, category_url],
					[family_name, family_url],
					[product_name, url],
				]}
				className={"child100"}
			/>
			{/* <Link href={`departments/${category_url}`} className='child100'>
				<Button variant='green' className='shadow-md '>
					Back to Products
				</Button>
			</Link> */}

			<Image
				className='child50 rounded-xl shadow-md object-contain '
				src={`/images/product/${upc.slice(0, 4)}/${upc}.jpg`}
				alt={product_name}
				width={300}
				height={300}
			/>
			<section className='child50 p-4 card flex flex-col justify-between text-white'>
				<h1 className='text-3xl'>{product_name}</h1>
				<h2 className='text-2xl'>{brand}</h2>
				<span className='flex'>
					<p>{stars}</p>
					{new Array(stars).fill(0).map((_, index) => {
						return (
							<Image
								key={index}
								src='/images/star.svg'
								alt='star'
								width={30}
								height={30}
							/>
						);
					})}
				</span>

				<p className='text-right text-2xl'>${avg_price}</p>
				<span className='flex justify-between'>
					<QuantityButton />

					<Button variant='default' className='shadow-md'>
						Add to Cart
					</Button>
				</span>
			</section>
			<section className='child100 card p-4 text-white'>
				<p className='text-base'>{product_description}</p>
			</section>
		</main>
	);
}

export default Product;
