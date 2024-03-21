import { Button, ButtonIcon } from "@/components/ui/button";
import { addToCart } from "@/lib/classes/cart";
import { useToast } from "@/components/ui/use-toast";

const AddToCartButton = ({ product, quantity, isIcon, className }) => {
	const { toast } = useToast();

	return (
		<>
			{isIcon ? (
				<ButtonIcon
					icon='add'
					onClick={(e) => {
						e.preventDefault();
						addToCart(product, quantity);
						toast({
							variant: "green",
							title: "Added to Cart",
							description: product.product_name,
						});
					}}
				/>
			) : (
				<Button
					className={className}
					onClick={(e) => {
						e.preventDefault();
						addToCart(product, quantity);
						toast({
							variant: "green",
							title: "Added to Cart",
							description: product.product_name,
						});
					}}
				>
					Add to Cart
				</Button>
			)}
		</>
	);
};

export default AddToCartButton;
