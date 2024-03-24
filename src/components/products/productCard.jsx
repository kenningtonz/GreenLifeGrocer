"use client";
import Link from "next/link";
import { AddToCartButton } from "@/components/cartButtons";
import Image from "next/image";
import { db } from "@/lib/db";

const ProductCard = ({ product, className, small, index }) => {
	const {
		product_name,
		brand,
		avg_price,
		id,
		stars,
		category_url,
		upc,
		unit,
		url,
		family_url,
	} = product;
	// console.log(upc);
	return (
		<Link
			key={`${upc}_${product_name}-${index}`}
			className={`${className}  flex flex-col justify-between p-3 hover:scale-105   bg-white  transition-all  rounded-2xl shadow-md shadow-olive-400/50 hover:shadow-olive-400`}
			href={`/grocery/${category_url}/${family_url}/${url}`}
		>
			<Image
				className={`rounded-md w-auto bg-white object-contain ${
					small ? "h-20" : "h-32"
				} h-auto`}
				src={`${db}/images/product/${upc.slice(0, 4)}/${upc}.jpg`}
				alt={product_name}
				width={175}
				height={100}
			/>
			{/* <h3 className='text-xl'>{upc.slice(0, 4)}</h3> */}

			<h3
				className={`${small ? "text-base" : "text-xl"}  text-green-900 font-medium`}
			>
				{product_name}
			</h3>
			<h4 className={`text-green-800 ${small ? "text-sm" : "text-lg"} italic`}>
				{brand}
			</h4>

			<span className='flex justify-between'>
				<p className='text-olive-700  mt-2 text-base'>
					${avg_price} {unit}
				</p>
				<AddToCartButton id={id} name={product_name} quantity={1} isIcon={true} />
			</span>
		</Link>
	);
};

export default ProductCard;

{
	/* <p className='text-olive-700  mt-2 text-base'>
${avg_price} {unit}
</p>
<AddToCartButton
className='shadow w-full self-end mt-2'
id={id}
name={product_name}
quantity={1}
isIcon={false}
/> */
}
