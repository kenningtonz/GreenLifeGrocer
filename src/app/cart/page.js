"use client";
import { getProductsByCart } from "@/lib/classes/cart";
import { getCart } from "@/lib/context/cart";
import Image from "next/image";
import { Button, ButtonIcon } from "@/components/ui/button";
import Link from "next/link";
import { isSessionValid } from "@/lib/classes/user";
import groceryStore from "@/lib/classes/store";
import {
	RemoveFromCartButton,
	QuantityCartButton,
} from "@/components/cartButtons";
import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import { useCartContext } from "@/lib/context/cart";

export default function Cart() {
	const [cart, setCart] = useCartContext();
	const [cartProducts, setCartProducts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getProductsByCart(cart);
				setCartProducts(result.products);
				console.log(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		if (Object.keys(cart).length > 0) {
			fetchData();
		}
	}, [cart]);

	if (Object.keys(cart).length === 0) {
		return (
			<main className='p-4'>
				<h1 className='text-xl text-center'>Your Cart</h1>
				<p className='text-center'>Your cart is empty</p>
			</main>
		);
	}

	const subTotal =
		Math.round(
			(cartProducts.reduce(
				(acc, item) => acc + item.avg_price * item.quantity,
				0
			) +
				Number.EPSILON) *
				100
		) / 100;

	const tax =
		Math.round(
			(cartProducts.reduce(
				(acc, item) => (item.taxable ? acc + item.avg_price * 0.13 : acc),
				0
			) +
				Number.EPSILON) *
				100
		) / 100;

	const total = Math.round((subTotal + tax + Number.EPSILON) * 100) / 100;

	return (
		<main className='sm:px-8 py-8 px-4  flex flex-col gap-4'>
			<h1 className='text-2xl text-green-900 font-bold text-center'>Your Cart</h1>
			<table className='w-full border-collapse table-auto'>
				<thead className='text-center font-bold text-lg bg-olive/80'>
					<tr className=''>
						<th className='p-2 rounded-l-lg text-left'>Product</th>
						<th className='p-2'>Price</th>
						<th className='p-2'>Quantity</th>
						<th className='p-2'>Total</th>
						<th className='p-2'>Tax</th>
						<th className='p-2 rounded-r-lg'>x</th>
					</tr>
				</thead>
				<tbody className=' '>
					{cartProducts.map((product, index) => {
						const upc = product.upc;
						return (
							<tr
								key={`${product.product_name}-cart-${index}`}
								className={`p-2 border-b-2 border-olive my-2 rounded-lg text-center`}
							>
								<td className='flex gap-1 items-center p-2 text-left'>
									<Image
										src={`${db}/images/product/${upc.slice(0, 4)}/${upc}.jpg`}
										alt={product.product_name}
										width={80}
										height={80}
										className='rounded-lg w-auto'
									/>
									<Link
										className='px-2 hover:underline decoration-green decoration-2'
										href={`/grocery/${product.category_url}/${product.family_url}/${product.url}`}
									>
										<p className='text-lg'>{product.product_name}</p>
										<p className='italic'>{product.brand}</p>
									</Link>
								</td>
								<td className='p-2'>{product.avg_price}</td>
								<td className='p-2'>
									<QuantityCartButton className={"max-w-48"} id={product.id} />
								</td>
								<td className='p-2'>{product.avg_price * product.quantity}</td>
								<td className='p-2'>{product.taxable ? "Y" : "N"}</td>
								<td className='p-2'>
									<RemoveFromCartButton id={product.id} name={product.product_name} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<section className='flex flex-col gap-1 self-end w-1/3'>
				<span className='flex justify-between'>
					<p className='text-lg text-green-900/80 '>Subtotal:</p>
					<p className='text-lg text-green-900/80 '>${subTotal}</p>
				</span>
				<span className='flex justify-between'>
					<p className='text-lg text-green-900/80 '>Tax:</p>
					<p className='text-lg text-green-900/80 '>${tax}</p>
				</span>
				<span className='flex justify-between'>
					<p className='text-xl font-bold text-green-900'>Total:</p>
					<p className='text-xl font-bold text-green-900'>${total}</p>
				</span>
				<Button className='shadow'>Checkout</Button>
			</section>
		</main>
	);
}
