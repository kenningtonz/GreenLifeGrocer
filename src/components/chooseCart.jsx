"use client";
import { useCartContext } from "@/lib/context/cart";
import { useUserContext } from "@/lib/context/user";
import { setUserCart } from "@/lib/classes/cart";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

const ChooseCart = ({ open, setOpen }) => {
	const router = useRouter();
	const [cart, setCart] = useCartContext();
	const [user, setUser] = useUserContext();
	return (
		<AlertDialog open={open}>
			<AlertDialogContent className='bg-white'>
				<AlertDialogHeader>
					<AlertDialogTitle>Choose Cart</AlertDialogTitle>
					<AlertDialogDescription>
						You have a saved cart. Would you like to use it?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction
						variant={"green"}
						onClick={() => {
							setOpen(false);
							setUser({ ...user, cart: cart });
							router.push("/account");
						}}
					>
						Keep Current Cart
					</AlertDialogAction>

					<AlertDialogAction
						variant={"default"}
						onClick={() => {
							setCart(JSON.parse(user.cart));
							setUserCart(JSON.stringify(cart), user.id);
							setOpen(false);
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
