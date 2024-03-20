"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, ButtonIcon } from "@/components/ui/button";
import { addToCart } from "@/lib/classes/cart";

const ProductCard = ({ product, className, small, index }) => {
	const {
		product_name,
		brand,
		avg_price,
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
			className={` flex flex-col justify-between p-3 ${className} ${
				small ? "min-w-36 max-w-48" : "min-w-48 max-w-64"
			} hover:scale-105   bg-white  transition-all  rounded-2xl shadow-md shadow-olive-400/50 hover:shadow-olive-400`}
			href={`/grocery/${category_url}/${family_url}/${url.toLowerCase()}_${upc}`}
		>
			<Image
				className={`rounded-md w-auto bg-white object-contain ${
					small ? "h-20" : "h-32"
				} h-auto`}
				src={`/images/product/${upc.slice(0, 4)}/${upc}.jpg`}
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

			{small ? (
				<spa className='flex justify-between'>
					<p className='text-olive-700  mt-2 text-base'>${avg_price}</p>
					<ButtonIcon icon={"add"} onClick={() => addToCart(product, 1)} />
				</spa>
			) : (
				<>
					<p className='text-olive-700  mt-2 text-base'>
						${avg_price} per {unit}
					</p>
					<Button
						variant='default'
						className='shadow w-full self-end mt-2'
						onClick={() => addToCart(product, 1)}
					>
						Quick Add to Cart
					</Button>
				</>
			)}
		</Link>
	);
};

export default ProductCard;
