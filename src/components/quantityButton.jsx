"use client";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/classes/cart";

import AddToCartButton from "@/components/addToCartButton";

export function QuantityButton({ className, product, isCart }) {
	const [quantity, setQuantity] = useState(1);

	if (isCart) {
		return (
			<span className='flex justify-between'>
				<div className={`justify-end flex gap-1 px-4 items-center ${className}`}>
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
						variant='ghost'
						size='icon'
						onClick={() => {
							setQuantity(quantity + 1);
						}}
					>
						<Plus className='h-6 w-6' />
					</Button>
				</div>

				<AddToCartButton
					className='shadow-md child50'
					product={product}
					quantity={quantity}
					isIcon={false}
				/>
			</span>
		);
	}

	return (
		<div className={`justify-end flex gap-1 px-4 items-center ${className}`}>
			<Button
				variant='ghost'
				disabled={quantity === 1}
				size='icon'
				onClick={() => {
					addToCart(product, quantity - 1 < 1 ? 1 : quantity - 1);
				}}
			>
				<Minus className='h-6 w-6' />
			</Button>
			<p className='rounded-md text-2xl text-center bg-white h-8 w-8 text-green-900'>
				{quantity}
			</p>
			<Button
				variant='ghost'
				size='icon'
				onClick={() => {
					addToCart(product, quantity + 1);
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
