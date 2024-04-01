"use client";
import { useCartContext } from "@/lib/context/cart";
import { useUserContext } from "@/lib/context/user";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loader from "@/components/loader";
import { getProductsByCart, completePurchase } from "@/lib/classes/cart";
import { useRouter } from "next/navigation";
import { InputWithLabel } from "@/components/ui/input";
import { password_validation } from "@/lib/utils/inputValidations";
import { fetchData } from "@/lib/db";
import ShippingForm from "@/components/forms/shippingForm";
import PaymentForm from "@/components/forms/paymentForm";

import { FormProvider, useForm } from "react-hook-form";
import { createAccountGuest } from "@/lib/classes/user";
import { setCookie, deleteCookie } from "@/lib/classes/cookieNext";
import { dateFormatter } from "@/lib/utils/dateFormatter";

export default function Checkout() {
	const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
	const methods = useForm({ mode: "onBlur" });
	function scrollToTop() {
		if (!isBrowser()) return;
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	const [isMounted, setIsMounted] = useState(false);
	const [user, setUser] = useUserContext();
	const [stepIndex, setStepIndex] = useState(0);
	const [cart, setCart] = useCartContext();
	const [cartProducts, setCartProducts] = useState([]);
	const [checkoutUser, setCheckoutUser] = useState({});
	const [isGuest, setIsGuest] = useState(false);
	const [guestCreated, setGuestCreated] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const [paymentInfo, setPaymentInfo] = useState({
		card_number: null,
		expiry_date: null,
		cvv: null,
	});
	const [invoice, setInvoice] = useState();
	const [completed, setCompleted] = useState(false);

	useEffect(() => {
		if (Object.keys(cart).length === 0 && stepIndex != 3) {
			router.push("/cart");
		}

		fetchData(getProductsByCart, cart).then((data) => {
			if (typeof data === "string") {
				console.log(data);
			} else {
				setCartProducts(data.products);
			}
		});

		setIsMounted(true);
	}, [cart]);

	useEffect(() => {
		if (Object.keys(user).length === 0 && stepIndex != 3) {
			setIsGuest(true);
			setCheckoutUser({
				id: -1,
				email: null,
				shipping_name_first: null,
				shipping_name_last: null,
				shipping_address: null,
				shipping_city: null,
				shipping_province: null,
				shipping_postal_code: null,
				shipping_phone: null,
				same_as: 0,
				billing_name_first: null,
				billing_name_last: null,
				billing_address: null,
				billing_city: null,
				billing_province: null,
				billing_postal_code: null,
			});
		} else {
			setCheckoutUser(user);
		}
	}, []);

	const complete = async (e) => {
		e.preventDefault();
		setCompleted(true);
		const completeData = await fetchData(completePurchase, cart, checkoutUser);
		if (typeof completeData === "string") {
			setError(completeData);
		} else {
			setCart({});
			setInvoice(completeData);
			setStepIndex(3);
			deleteCookie("cart");
		}

		console.log(completeData);
	};

	const steps = ["Shipping", "Payment", "Review", "Complete"];

	const createAccountSubmit = methods.handleSubmit(
		async (data) => {
			console.log(checkoutUser);
			const createData = await fetchData(
				createAccountGuest,
				checkoutUser,
				data.password
			);
			console.log(createData);
			if (typeof createData === "string") {
				setError(createData);
				// setClicked(false);
			} else {
				setCheckoutUser({ ...checkoutUser, id: createData.id });
				setUser(checkoutUser);
				setCookie("session", createData.session);
				methods.reset();
				setIsGuest(false);
				setGuestCreated(true);
			}
		},
		(data) => {
			console.log(data);
		}
	);

	if (!isMounted) {
		return <Loader />;
	}
	return (
		<main className='flex-col p-4 mainGreen pb-8 gap-4 scroll-smooth'>
			{stepIndex === 3 ? null : (
				<Link href='/cart' className=' self-start'>
					<Button variant='default' className='shadow' press={"pressed"}>
						Back to Cart
					</Button>
				</Link>
			)}
			<h1 className='text-3xl text-center '>
				{stepIndex === 3
					? "Order Complete!"
					: isGuest
					? "Guest Checkout"
					: "Checkout"}
			</h1>
			<ul className='flex gap-8 justify-center mb-4 '>
				{steps.map((step, index) => (
					<li className='relative flex flex-col items-center' key={index}>
						<div
							aria-hidden={true}
							data-active={stepIndex == index}
							className='h-5 w-5 rounded-full data-[active=false]:bg-green-200 data-[active=true]:bg-green z-20'
						></div>
						{index != steps.length - 1 ? (
							<div
								aria-hidden={true}
								className=' absolute left-1/2 top-[9px] w-24 h-[2px] bg-green-800 z-10'
							></div>
						) : null}
						<p
							className={`mt-4 text-lg ${
								stepIndex == index ? "text-green-900 font-semibold" : "text-green-800 "
							}`}
						>
							{step}
						</p>
					</li>
				))}
			</ul>
			{stepIndex != 3 && cartProducts != null ? (
				<OrderSummary cartProducts={cartProducts} />
			) : null}
			{isGuest && stepIndex != 3 ? (
				<section className='p-4 w-full bg-white rounded-lg shadow shadow-olive-500 '>
					<p className=''>
						<Link
							href={{ pathname: "/login", query: { from: "checkout" } }}
							className='hover:underline text-lg text-green'
						>
							Login
						</Link>{" "}
						for a faster checkout experience, or you can continue as a guest. You will
						have the option to create an account after your purchase.
					</p>
				</section>
			) : null}
			<>
				{stepIndex === 0 ? (
					<section className='p-4 w-full card'>
						<ShippingForm
							user={checkoutUser}
							setUser={setCheckoutUser}
							buttonText={"Next"}
							required={true}
							extraFunction={() => {
								scrollToTop();
								setStepIndex(1);
							}}
						/>
					</section>
				) : null}
				{stepIndex === 1 ? (
					<section className='p-4 w-full card'>
						<PaymentForm
							user={checkoutUser}
							setUser={setCheckoutUser}
							setPaymentInfo={setPaymentInfo}
							paymentInfo={paymentInfo}
							extraFunction={() => {
								scrollToTop();
								setStepIndex(2);
							}}
						/>
					</section>
				) : null}
				{stepIndex === 2 ? (
					<section className='p-4 w-full card'>
						<div className='flex flex-col'>
							<h3 className='text-2xl text-green-800 font-semibold mb-2'>
								Personal Info{" "}
								<button
									className='hover:underline text-sm pl-2 text-green'
									onClick={() => setStepIndex(0)}
								>
									Edit
								</button>
							</h3>
							<p className='text-lg'>
								{checkoutUser.shipping_name_first} {checkoutUser.shipping_name_last}
							</p>
							<p className='text-lg'>{checkoutUser.email}</p>
							<p className='text-lg'>{checkoutUser.shipping_phone}</p>
						</div>
						<div aria-hidden={true} className='h-[2px] my-4 bg-olive/50'></div>
						<div className='flex flex-col'>
							<h3 className='text-2xl text-green-800 font-semibold'>
								Shipping{" "}
								<button
									className='hover:underline text-sm pl-2 text-green'
									onClick={() => setStepIndex(0)}
								>
									Edit
								</button>
							</h3>
							<p className='text-lg'>
								{checkoutUser.shipping_name_first} {checkoutUser.shipping_name_last}
							</p>
							<p className='text-lg'>{checkoutUser.shipping_address}</p>
							<p className='text-lg'>
								{checkoutUser.shipping_city} , {checkoutUser.shipping_province} ,{" "}
								{checkoutUser.shipping_postal_code}
							</p>
						</div>
						<div aria-hidden={true} className='h-[2px] my-4 bg-olive/50'></div>
						<div className='flex flex-col'>
							<h3 className='text-2xl text-green-800 font-semibold'>
								Payment Info{" "}
								<button
									className='hover:underline text-sm pl-2 text-green'
									onClick={() => setStepIndex(1)}
								>
									Edit
								</button>
							</h3>
							<p className='text-lg'>
								Card Number: **** **** ****{" "}
								{paymentInfo.card_number.substr(paymentInfo.card_number.length - 4)}
							</p>
							<p className='text-lg'>Expiry Date: {paymentInfo.expiry_date} </p>
							<p className='text-lg'>CVV: {paymentInfo.cvv} </p>
							{checkoutUser.same_as == 0 ? (
								<div className='flex flex-col'>
									<h3 className='text-2xl text-green-800 font-semibold'>
										{" "}
										Billing Address
									</h3>
									<p className='text-lg'>
										{checkoutUser.billing_name_first} {checkoutUser.billing_name_last}
									</p>
									<p className='text-lg'>{checkoutUser.billing_address}</p>
									<p className='text-lg'>
										{checkoutUser.billing_city} , {checkoutUser.billing_province} ,{" "}
										{checkoutUser.billing_postal_code}
									</p>
								</div>
							) : (
								<p>Billing address same as shipping.</p>
							)}
						</div>
						<p className='text-sm text-red-800 text-center'>{error}</p>
						<Button
							className='w-full shadow mt-4'
							press={"pressed"}
							variant={"greenDark"}
							disabled={completed}
							onClick={(e) => complete(e)}
						>
							Complete Purchase
						</Button>
					</section>
				) : null}
				{stepIndex === 3 ? (
					<section className='p-4  card flex flex-col items-center w-full gap-2 '>
						<p className='text-xl text-green-800 font-semibold'>
							Thank you for your purchase! You will receive an email with your order
							details.
						</p>
						{guestCreated ? (
							<>
								<p>Your account has been created.</p>
							</>
						) : null}
						{isGuest ? (
							//create account
							<>
								<p>
									You can create an account to save your information for future
									purchases.
								</p>
								<FormProvider {...methods}>
									<form
										className='flex flex-col'
										autoComplete='off'
										onSubmit={(e) => e.preventDefault()}
										noValidate
									>
										<InputWithLabel
											validation={password_validation}
											label='Password'
											id='password'
											type='text'
											isRequired={true}
											placeholder='Password'
										/>
										<Button
											className='shadow w-full my-2'
											press={"pressed"}
											variant='greenDark'
											type='submit'
											onClick={createAccountSubmit}
										>
											Create Account
										</Button>
									</form>
								</FormProvider>
								<div
									aria-hidden={true}
									className='h-[2px] my-4 bg-olive/50  mx-2 w-full'
								></div>
							</>
						) : null}

						{invoice != null ? <Receipt invoice={invoice} /> : null}
						<Button
							className='w-full shadow'
							press={"pressed"}
							variant={"greenDark"}
							onClick={() => router.push("/")}
						>
							Home
						</Button>
					</section>
				) : null}
			</>
		</main>
	);
}

const OrderSummary = ({ cartProducts }) => {
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
		<section className=' w-full  shadow rounded-lg bg-white shadow-olive-500 p-4'>
			<h2 className='text-green-900 text-2xl text-center font-bold mb-4 '>
				Order Summary
			</h2>
			<ul className='w-full space-y-2 mb-4'>
				{cartProducts.map((product, index) => (
					<li
						className='flex justify-between'
						key={`${product.product_name}-${index}`}
					>
						<p>
							{product.quantity} x {product.product_name}
						</p>
						<p>${product.avg_price * product.quantity}</p>
					</li>
				))}
			</ul>
			<div aria-hidden={true} className='h-[2px] mb-4 bg-olive/50'></div>
			<div className='w-full '>
				<span className='flex justify-between mb-2'>
					<p className='text-lg text-green-900 '>Subtotal:</p>
					<p className='text-lg text-green-900 '>${subTotal}</p>
				</span>
				<span className='flex justify-between mb-2'>
					<p className='text-lg text-green-900'>Tax:</p>
					<p className='text-lg text-green-900 '>${tax}</p>
				</span>
				<div aria-hidden={true} className='h-1 rounded-t-lg bg-olive'></div>
				<span className='flex justify-between bg-olive-100 rounded-b-lg p-2 '>
					<p className='text-xl font-bold text-green-900'>Total:</p>
					<p className='text-xl font-bold text-green-900'>${total}</p>
				</span>
			</div>
		</section>
	);
};

const Receipt = ({ invoice }) => {
	return (
		<>
			<p className='mb-2'>
				<strong>Invoice ID: </strong>
				{invoice.transaction_id}
			</p>
			<p>
				<strong>Order Date: </strong>
				{/* {invoice.date} */}
				{dateFormatter(invoice.date)}
			</p>

			<div
				aria-hidden={true}
				className='h-[2px] my-4 bg-olive/50  mx-2 w-full'
			></div>

			<section className='flex gap-4 justify-around px-4 w-full'>
				<div>
					<h3 className='text-2xl text-green-800 font-semibold'>Shipped To:</h3>
					<p className='text-lg'>
						{invoice.user.shipping_name_first} {invoice.user.shipping_name_last}
					</p>
					<p className='text-lg'>{invoice.user.shipping_address}</p>
					<p className='text-lg'>
						{invoice.user.shipping_city} , {invoice.user.shipping_province} ,{" "}
						{invoice.user.shipping_postal_code}
					</p>
				</div>
				<div>
					<h3 className='text-2xl text-green-800 font-semibold'>Billed To:</h3>
					<p className='text-lg'>
						{invoice.user.billing_name_first} {invoice.user.billing_name_last}
					</p>
					<p className='text-lg'>{invoice.user.billing_address}</p>
					<p className='text-lg'>
						{invoice.user.billing_city} , {invoice.user.billing_province} ,{" "}
						{invoice.user.billing_postal_code}
					</p>
				</div>
			</section>
			<div
				aria-hidden={true}
				className='h-[2px] my-4 bg-olive/50 w-full mx-2'
			></div>

			<table className='w-full'>
				<thead className='text-green-900 font-bold text-left text-lg '>
					<tr>
						<th className='p-2'>Product</th>
						<th className='p-2'>Quantity</th>
						<th className='p-2'>Price</th>
						<th className='p-2'>Taxed</th>
					</tr>
				</thead>
				<tbody>
					{invoice.products.map((product, index) => (
						<tr className='p-2 ' key={`${product.product_name}-${index}`}>
							<td className='p-2'>{product.product_name}</td>
							<td className='p-2'>{product.quantity}</td>
							<td className='p-2'>${product.avg_price * product.quantity}</td>
							<td className='p-2'>{product.taxable == 0 ? "Y" : "N"}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div
				aria-hidden={true}
				className='h-[1px] my-1 bg-olive/50 mx-2 w-full'
			></div>

			<section className='flex flex-col gap-1 max-w-sm mb-4 p-2 self-end w-full'>
				<span className='flex justify-between'>
					<p className='text-lg text-green-900/80 '>Subtotal:</p>
					<p className='text-lg text-green-900/80 '>${invoice.sub_total}</p>
				</span>
				<span className='flex justify-between'>
					<p className='text-lg text-green-900/80 '>Tax:</p>
					<p className='text-lg text-green-900/80 '>${invoice.tax}</p>
				</span>
				<span className='flex justify-between'>
					<p className='text-xl font-bold text-green-900'>Total:</p>
					<p className='text-xl font-bold text-green-900'>${invoice.total}</p>
				</span>
			</section>
		</>
	);
};
