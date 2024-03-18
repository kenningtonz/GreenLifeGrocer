"use client";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function QuantityButton() {
	const [quantity, setQuantity] = useState(1);

	return (
		<div className='flex gap-1 items-center'>
			<Button
				variant='ghost'
				disabled={quantity === 1}
				size='icon'
				onClick={() => {
					setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
				}}
			>
				<Minus className='h-6 w-6' />
			</Button>
			<p className='rounded-md text-2xl text-center bg-white h-8 w-8 text-green-900'>
				{quantity}
			</p>
			<Button
				variant='ghostWhite'
				size='icon'
				onClick={() => {
					setQuantity(quantity + 1);
				}}
			>
				<Plus className='h-6 w-6' />
			</Button>
		</div>
	);
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
