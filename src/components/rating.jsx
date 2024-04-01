import { Star } from "lucide-react";

const Rating = ({ num, size = 32 }) => {
	const stars = new Array(parseInt(num)).fill(0);
	return (
		<div className='flex gap-1'>
			{stars.map((_, index) => {
				return (
					<Star
						key={`${index}-star`}
						fill='#f1acac'
						strokeLinejoin='round'
						strokeLinecap='round'
						stroke='#f1acac'
						className='w-auto'
						size={size}
					/>
				);
			})}
		</div>
	);
};

export default Rating;
