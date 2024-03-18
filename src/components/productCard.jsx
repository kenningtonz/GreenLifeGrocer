import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ProductCard = ({
	name,
	cost,
	brand,
	upc,
	url,
	category_url,
	family_url,
}) => {
	// console.log(upc);
	return (
		<li
			key={`${upc}_${name}`}
			className={`card flex-1 max-w-64 min-w-48 p-2 text-white flex flex-col justify-between gap-2`}
		>
			<Link
				key={`${upc}_${name}`}
				href={`/grocery/${category_url}/${family_url}/${url.toLowerCase()}_${upc}`}
			>
				<Image
					className='rounded-md w-auto h-100 bg-white'
					src={`/images/product/${upc.slice(0, 4)}/${upc}.jpg`}
					alt={name}
					width={175}
					height={100}
				/>
				{/* <h3 className='text-xl'>{upc.slice(0, 4)}</h3> */}

				<h3 className='text-xl'>{name}</h3>
				<h4>{brand}</h4>
				<span className='flex justify-between items-center'>
					<p>${cost}</p>
					<Button variant='default' className='shadow-md'>
						Add to Cart
					</Button>
				</span>
			</Link>
		</li>
	);
};

export default ProductCard;
