const Hero = ({ image, children, className }) => {
	// console.log(image);
	return (
		<section
			style={{ "--image-url": `url(/images/home/${image})` }}
			className={` p-8  shadow-md flex flex-col w-full rounded-lg ${className} bg-cover bg-center min-h-[400px] bg-[image:var(--image-url)]`}
		>
			{children}
		</section>
	);
};

export default Hero;
