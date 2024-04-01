"use client";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Button, ButtonIcon } from "@/components/ui/button";

import { AddToCartButton } from "@/components/cartButtons";

export function QuantityButton({ className, id, name }) {
	const [quantity, setQuantity] = useState(1);
	// console.log(product);

	return (
		<>
			<div className={`flex items-center justify-center  ${className}`}>
				<ButtonIcon
					Icon={Minus}
					color='pink'
					rotate={false}
					filled={false}
					size={24}
					disabled={quantity == 1}
					onClick={(e) => {
						e.preventDefault();
						setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
					}}
				/>

				<p className='rounded-md text-xl text-center bg-white h-8 pt-0.5 w-8 text-green-900'>
					{quantity}
				</p>
				<ButtonIcon
					Icon={Plus}
					color='green'
					rotate={false}
					size={24}
					filled={false}
					onClick={(e) => {
						e.preventDefault();
						setQuantity(quantity + 1);
					}}
				/>
				<AddToCartButton
					className='shadow-md ml-2 '
					id={id}
					name={name}
					quantity={quantity}
					isIcon={false}
				/>
			</div>
		</>
	);
}

{
	/* <div
				className={`sm:justify-end justify-center flex gap-1  px-2 sm:px-4 items-center ${className}`}
			>
				<Button
					variant='ghost'
					disabled={quantity === 1}
					size='icon'
				
				>
					<Minus className='h-6 w-6' />
				</Button>
			
				<Button
					variant='ghost'
					size='icon'
					onClick={() => {
					
					}}
				>
					<Plus className='h-6 w-6' />
				</Button>
			</div> */
}

// .quantityButton button {
// 	background: transparent;
// 	border: none;
// 	height: 32px;
// 	width: 32px;
// 	font-size: 32px;
// 	color: #ffffff;
// 	line-height: 32px;
// 	box-shadow: none;
// 	cursor: pointer;
// 	transition: color 0.2s ease-in-out;
// }

// .quantityButton p {
// 	background: #ffffff;
// 	width: 32px;

// 	color: #021b02;
// 	padding: 0.4rem;
// }
