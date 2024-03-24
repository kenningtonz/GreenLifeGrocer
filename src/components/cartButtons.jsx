"use client";
import { Button, ButtonIcon } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCartContext } from "@/lib/context/cart";
import { Plus, Minus } from "lucide-react";

export const AddToCartButton = ({ id, name, quantity, isIcon, className }) => {
	const [cart, setCart] = useCartContext();
	const { toast } = useToast();
	const addToCart = () => {
		if (Object.keys(cart).includes(id)) {
			cart[id] += quantity;
		} else {
			cart[id] = quantity;
		}
		console.log(cart);
		setCart({ ...cart });
	};

	return (
		<>
			{isIcon ? (
				<ButtonIcon
					icon='add'
					onClick={(e) => {
						e.preventDefault();
						addToCart();
						toast({
							variant: "green",
							title: "Added to Cart",
							description: name,
						});
					}}
				/>
			) : (
				<Button
					className={className}
					onClick={(e) => {
						e.preventDefault();
						addToCart();
						toast({
							variant: "green",
							title: "Added to Cart",
							description: name,
						});
					}}
				>
					Add to Cart
				</Button>
			)}
		</>
	);
};

export const RemoveFromCartButton = ({ id, name }) => {
	const [cart, setCart] = useCartContext();
	const { toast } = useToast();
	const removeFromCart = (id) => {
		delete cart[id];
		setCart({ ...cart });
	};
	return (
		<ButtonIcon
			icon='remove'
			onClick={(e) => {
				e.preventDefault();
				removeFromCart(id);
				toast({
					variant: "pink",
					title: "Removed from Cart",
					description: name,
				});
			}}
		/>
	);
};

export function QuantityCartButton({ className, id }) {
	const [cart, setCart] = useCartContext();
	// console.log(product);
	const addToCart = (quantity) => {
		console.log(quantity);
		if (Object.keys(cart).includes(id)) {
			cart[id] += quantity;
		} else {
			cart[id] = quantity;
		}
		setCart({ ...cart });
		console.log(cart);
	};

	return (
		<div className={`justify-end flex gap-1 px-4 items-center ${className}`}>
			<Button
				variant='ghost'
				disabled={cart[id] === 1}
				size='icon'
				onClick={(e) => {
					e.preventDefault();
					addToCart(cart[id] - 1 < 1 ? 0 : -1);
				}}
			>
				<Minus className='h-6 w-6' />
			</Button>
			<p className='rounded-md text-2xl text-center bg-white h-8 w-8 text-green-900'>
				{cart[id]}
			</p>
			<Button
				variant='ghost'
				size='icon'
				onClick={(e) => {
					e.preventDefault();
					addToCart(1);
				}}
			>
				<Plus className='h-6 w-6' />
			</Button>
		</div>
	);
}
