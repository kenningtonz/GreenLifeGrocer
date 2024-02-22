import Image from "next/image";

export default function Product() {
	let name = "Frosting, Butter Cream";
	let brand = "Betty Crocker";
	let cost = "2.99";
	let image = "/images/products/16000329904.jpg";
	let rating = 4;
	let description =
		"Artificially flavored. Visit BettyCrocker.com/Birthdays for creative ideas and more. Betty Crocker Kitchens Tested & Approved: Each Betty Crocker product promises delicious homemade taste every time. Carbohydrate Choices: 1. Gluten free.";

	return (
		<main className='bg-green-300 flex gap-1 flex-wrap  p-1 justify-between'>
			<Image
				className='child50 rounded-xl shadow-md'
				src={image}
				alt={name}
				width={200}
				height={200}
			/>
			<section className='child50 p-1 card flex flex-col justify-between'>
				<h1 className='text-xl'>{name}</h1>
				<h2 className='text-md'>{brand}</h2>
				<span className='flex'>
					{new Array(rating).fill(0).map((_, index) => {
						return (
							<Image
								key={index}
								src='/images/star.svg'
								alt='star'
								width={20}
								height={20}
							/>
						);
					})}
				</span>

				<p className='text-right text-xl'>${cost}</p>
				<span className='flex justify-between'>
					<div className='quantityButton'>
						<button>-</button>
						<p>1</p>
						<button>+</button>
					</div>
					<button className='button'>Add to Cart</button>
				</span>
			</section>
			<section className='child100 card p-1'>
				<p className='text-sm'>{description}</p>
			</section>
		</main>
	);
}
