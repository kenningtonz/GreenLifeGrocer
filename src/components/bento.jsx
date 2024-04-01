const BentoLayout = ({ className }) => {
	return (
		<section
			className={` grid gap-8 sm:grid-cols-[4fr_3fr_3fr] sm:grid-rows-3  max-w-3xl p-4 grid-cols-2 grid-rows-3 ${className}`}
		>
			<BentoCard
				image='fruit.webp'
				className='justify-end gap-2 shadow-[#A57187] text-pink-950'
				col={1}
				row={2}
			>
				<h3 className='sm:text-2xl text-lg  font-bold'>Fresh Produce</h3>
				<p className='text-lg hidden sm:block'>
					Locally-sourced fruits and veggies bursting with flavor and nutrients.
				</p>
			</BentoCard>

			<BentoCard
				image='bread.webp'
				className='shadow-[#8EA098]  justify-center text-blue-950 '
				col={2}
				row={1}
			>
				<h3 className='sm:text-2xl text-lg font-bold'>Bountiful Bread</h3>

				<p className='text-lg max-w-[70%] hidden sm:block'>
					Savor the aroma of freshly baked bread, crafted with care for your
					enjoyment.
				</p>
			</BentoCard>
			<BentoCard
				image='banana.webp'
				className='aspect-square shadow-amber-600 text-amber-950 text-center'
				col={1}
				row={1}
			>
				<h3 className='sm:text-2xl text-lg  font-bold'>Friendly Fruit</h3>
			</BentoCard>
			<BentoCard
				image='eggplant.webp'
				className='aspect-square shadow-[#5C476B] text-purple-950 text-center justify-end'
				col={1}
				row={1}
			>
				<h3 className='sm:text-2xl text-lg font-bold'>Organic Options</h3>
			</BentoCard>
			<BentoCard
				image='grapefruit.webp'
				className='shadow-olive-700 justify-center gap-2 text-lime-950 '
				col={2}
				row={1}
			>
				<h3 className='sm:text-2xl text-lg  font-bold'>Healthy Convenience</h3>
				<p className='text-lg max-w-[50%] hidden sm:block '>
					Pre-cut fruits, ready-to-eat salads, and grab-and-go snacks for busy days.
				</p>
			</BentoCard>

			<BentoCard
				image='kiwi.webp'
				className='aspect-square shadow-cyan-600 text-cyan-950 text-center order-6'
				col={1}
				row={1}
			>
				<h3 className='sm:text-2xl text-lg font-bold'>Green & Clean</h3>
			</BentoCard>
		</section>
	);
};

const BentoCard = ({ image, className, col, row, children }) => {
	return (
		<div
			style={{ "--image-url": `url(/images/home/${image})` }}
			className={` shadow-[4px_4px_0_0] p-6 flex flex-col rounded-lg bg-cover min-h-10 sm:min-h-30 col-span-1 row-span-1 sm:col-span-${col} sm:row-span-${row} ${className} bg-[image:var(--image-url)]`}
		>
			{children}
		</div>
	);
};

export default BentoLayout;
