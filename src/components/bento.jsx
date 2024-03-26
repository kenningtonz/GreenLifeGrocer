const BentoLayout = ({ className }) => {
	return (
		<section
			className={` grid gap-8 sm:grid-cols-[4fr_3fr_3fr] sm:grid-rows-3  max-w-3xl p-4 grid-cols-2 grid-rows-5 ${className}`}
		>
			<BentoCard
				image='fruit.webp'
				className='justify-end gap-2 shadow-pink-500 text-pink-950 sm:order-1 order-2'
				col={1}
				row={2}
			>
				<h3 className='text-2xl  font-bold'>Fresh Produce</h3>
				<p className='text-lg '>
					Locally-sourced fruits and veggies bursting with flavor and nutrients.
				</p>
			</BentoCard>

			<BentoCard
				image='bread.webp'
				className='shadow-blue-300  justify-center text-blue-950 sm:order-2 order-1'
				col={2}
				row={1}
			>
				<p className='text-lg max-w-[70%] '>
					Savor the aroma of freshly baked bread, crafted with care for your
					enjoyment.
				</p>
			</BentoCard>
			<BentoCard
				image='banana.webp'
				className='aspect-square shadow-amber-600 text-amber-950 text-center order-3'
				col={1}
				row={1}
			>
				<h3 className='text-2xl  font-bold'>Fruit</h3>
			</BentoCard>
			<BentoCard
				image='eggplant.webp'
				className='aspect-square shadow-purple-600 text-purple-950 text-center justify-end order-4'
				col={1}
				row={1}
			>
				<h3 className='text-2xl  font-bold'>Organic Options</h3>
			</BentoCard>
			<BentoCard
				image='grapefruit.webp'
				className='shadow-olive-700 justify-center gap-2 text-lime-950 order-5 '
				col={2}
				row={1}
			>
				<h3 className='text-2xl  font-bold'>Healthy Convenience</h3>
				<p className='text-lg max-w-[50%] '>
					Pre-cut fruits, ready-to-eat salads, and grab-and-go snacks for busy days.
				</p>
			</BentoCard>

			<BentoCard
				image='kiwi.webp'
				className='aspect-square shadow-cyan-600 text-cyan-950 text-center order-6'
				col={1}
				row={1}
			>
				<h3 className='text-2xl  font-bold'>Green & Clean</h3>
			</BentoCard>
		</section>
	);
};

const BentoCard = ({ image, className, col, row, children }) => {
	return (
		<div
			style={{ "--image-url": `url(/images/home/${image})` }}
			className={` shadow-[4px_4px_0_0] p-8 flex flex-col rounded-lg bg-cover min-h-10 sm:min-h-30 col-span-${col} row-span-${row} ${className} bg-[image:var(--image-url)]`}
		>
			{children}
		</div>
	);
};

export default BentoLayout;
