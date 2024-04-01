"use client";
import { Button, ButtonIcon } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCartContext } from "@/lib/context/cart";
import { useUserContext } from "@/lib/context/user";
import { Plus, Minus, CirclePlus, CircleX } from "lucide-react";
import { setCookie } from "@/lib/classes/cookieNext";
import { setUserCart } from "@/lib/classes/cart";
import { fetchData } from "@/lib/db";

export const AddToCartButton = ({ id, name, quantity, isIcon, className }) => {
	const [user, setUser] = useUserContext();
	const [cart, setCart] = useCartContext();
	const { toast } = useToast();

	const addToCart = () => {
		console.log(quantity);

		if (Object.keys(cart).includes(id)) {
			cart[id] += quantity;
		} else {
			console.log(id);
			cart[id] = quantity;
		}
		console.log(cart);
		setCart({ ...cart });
		if (Object.keys(user).length > 0) {
			fetchData(setUserCart, JSON.stringify(cart), user.id).then((res) => {
				console.log(res);
			});
		}
		console.log(JSON.stringify(cart));
		setCookie("cart", JSON.stringify(cart));
	};

	return (
		<>
			{isIcon ? (
				<ButtonIcon
					rotate={true}
					Icon={CirclePlus}
					color='green'
					name='Add to Cart'
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
			fetchData(setUserCart, JSON.stringify(cart), user.id).then((res) => {
				console.log(res);
			});
		}
	};
	return (
		<ButtonIcon
			Icon={CircleX}
			rotate={true}
			size={24}
			color='pink'
			name='Remove from Cart'
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
		if (Object.keys(cart).includes(id)) {
			cart[id] += quantity;
		} else {
			cart[id] = quantity;
		}
		setCart({ ...cart });

		if (Object.keys(user).length > 0) {
			fetchData(setUserCart, JSON.stringify(cart), user.id).then((res) => {
				console.log(res);
			});
		}
		setCookie("cart", JSON.stringify(cart));
	};

	return (
		<div className={`flex items-center justify-center ${className}`}>
			<ButtonIcon
				Icon={Minus}
				color='pink'
				rotate={false}
				filled={false}
				size={24}
				disabled={cart[id] == 1}
				onClick={(e) => {
					e.preventDefault();
					addToCart(cart[id] - 1 < 1 ? 0 : -1);
				}}
			/>

			<p className='rounded-md text-xl text-center bg-white h-8 pt-0.5 w-7 text-green-900'>
				{cart[id]}
			</p>
			<ButtonIcon
				Icon={Plus}
				color='green'
				rotate={false}
				size={24}
				filled={false}
				onClick={(e) => {
					e.preventDefault();
					addToCart(1);
				}}
			/>
		</div>
	);
}
