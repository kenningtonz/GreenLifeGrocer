"use client";
import { Button, ButtonIcon } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCartContext } from "@/lib/context/cart";
import { useUserContext } from "@/lib/context/user";
import { Plus, Minus } from "lucide-react";
import { setCookie } from "@/lib/classes/cookieNext";
import { setUserCart } from "@/lib/classes/cart";

export const AddToCartButton = ({ id, name, quantity, isIcon, className }) => {
	const [user, setUser] = useUserContext();
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
		if (Object.keys(user).length > 0) {
			console.log("usercart");
			setUserCart(JSON.stringify(cart), user.id).then((res) => {
				console.log(res);
			});
		}
		setCookie("cart", JSON.stringify(cart));
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
	const [user, setUser] = useUserContext();

	const { toast } = useToast();
	const removeFromCart = (id) => {
		delete cart[id];
		setCart({ ...cart });
		setCookie("cart", JSON.stringify(cart));
		if (Object.keys(user).length > 0) {
			setUserCart(JSON.stringify(cart), user.id).then((res) => {
				console.log(res);
			});
		}
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
	const [user, setUser] = useUserContext();

	// console.log(product);
	const addToCart = (quantity) => {
		console.log(quantity);
		if (Object.keys(cart).includes(id)) {
			cart[id] += quantity;
		} else {
			cart[id] = quantity;
		}
		setCart({ ...cart });

		if (Object.keys(user).length > 0) {
			setUserCart(cart, user.id).then((res) => {
				console.log(res);
			});
		}
		setCookie("cart", JSON.stringify(cart));
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
