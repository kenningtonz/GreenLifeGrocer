import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ProductCard = ({ name, cost, brand, upc }) => {
	return (
		<Link
			className={`card child25 text-white flex flex-col justify-between gap-o5`}
			href={`/products/product`}
		>
			<Image
				className='rounded-md w-auto h-100 bg-white'
				src={`/images/products/${upc}.jpg`}
				alt={name}
				width={175}
				height={100}
			/>
			<h3 className='text-xl'>{name}</h3>
			<h4>{brand}</h4>
			<span className='flex justify-between items-center'>
				<p>${cost}</p>
				<Button variant='default'>Add to Cart</Button>
			</span>
		</Link>
	);
};

export default ProductCard;
