const Error = ({ children, error }) => {
	return (
		<section className=' rounded-lg bg-white shadow-sm p-4 '>
			<h1 className='text-2xl text-center'>{error}</h1>
			{children}
		</section>
	);
};

export default Error;
