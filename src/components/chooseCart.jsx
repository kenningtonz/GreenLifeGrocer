"use client";
import { useCartContext } from "@/lib/context/cart";
import { useUserContext } from "@/lib/context/user";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

const ChooseCart = () => {
	const router = useRouter();
	const [cart, setCart] = useCartContext();
	const [user, setUser] = useUserContext();
	return (
		<AlertDialog>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Choose Cart</AlertDialogTitle>
					<AlertDialogDescription>
						You have a saved cart. Would you like to use it?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={() => {
							setUser({ ...user, cart: cart });
							router.push("/account");
						}}
					>
						Keep Current Cart
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							setCart(user.cart);
							router.push("/account");
						}}
					>
						Use Saved Cart
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ChooseCart;
