import { Button, ButtonIcon } from "@/components/ui/button";
import { addToCart, removeFromCart } from "@/lib/classes/cart";
import { useToast } from "@/components/ui/use-toast";

export const AddToCartButton = ({ id, name, quantity, isIcon, className }) => {
	const { toast } = useToast();

	return (
		<>
			{isIcon ? (
				<ButtonIcon
					icon='add'
					onClick={(e) => {
						e.preventDefault();
						addToCart(id, quantity);
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
						addToCart(id, quantity);
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
	const { toast } = useToast();
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
