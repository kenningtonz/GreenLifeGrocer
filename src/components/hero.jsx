const Hero = ({ image, content }) => {
	// console.log(image);
	return (
		<section
			className='grid w-full place-items-center bg-cover bg-center min-h-[300px]'
			style={{ backgroundImage: `url(${image})` }}
		>
			<div className='col-start-1 row-start-1 h-full w-full bg-white  bg-opacity-60'></div>
			<div className='col-start-1 row-start-1 z-0 flex items-center justify-center l gap-4 p-4 text-center text-neutral-content'>
				<div className='max-w-md'>{content}</div>
			</div>
		</section>
	);
};

export default Hero;
