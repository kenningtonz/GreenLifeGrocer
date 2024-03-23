const Rating = ({ num, size = 32 }) => {
	const stars = new Array(parseInt(num)).fill(0);
	return (
		<div className='flex gap-1'>
			{stars.map((_, index) => {
				return (
					<img
						key={`${index}-star`}
						src='/images/star.svg'
						alt='star'
						className='w-auto'
						width={size}
						height={size}
					/>
				);
			})}
		</div>
	);
};

export default Rating;
