"use client";
import { useCartContext } from "@/lib/context/cart";
import { useUserContext } from "@/lib/context/user";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loader from "@/components/loader";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Checkout() {
	const [isMounted, setIsMounted] = useState(false);
	const [user, setUser] = useUserContext();
	const [stepIndex, setStepIndex] = useState(0);
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
		if (Object.keys(user).length === 0) {
			console.log("user is null");
			router.push("/cart");
		}
		fetchData();
		setIsMounted(true);
	}, []);

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

	if (!isMounted) {
		return <Loader />;
	}
	return (
		<main className='flex flex-wrap '>
			<nav className='flex gap-4 p-4 justify-center w-full child100'>
				<Link href='/cart'>
					<Button variant='default' className='self-start'>
						Back to Cart
					</Button>
				</Link>
				<Button
					variant='green'
					data-active={stepIndex == 0}
					onClick={() => setStepIndex(1)}
				>
					Shipping
				</Button>
				<Button
					variant='green'
					data-active={stepIndex == 1}
					disabled={stepIndex < 1}
					onClick={() => setStepIndex(1)}
				>
					Payment
				</Button>

				<Button
					variant='green'
					data-active={stepIndex == 2}
					disabled={stepIndex < 2}
					onClick={() => setStepIndex(2)}
				>
					Review
				</Button>
				<Button
					variant='green'
					data-active={stepIndex == 3}
					disabled={stepIndex < 3}
					onClick={() => setStepIndex(3)}
				>
					Complete
				</Button>
			</nav>

			<section className='p-4 child70'>
				{stepIndex === 0 ? (
					<>
						<p className='text-green-900'>Shipping</p>
						<ShippingForm
							user={user}
							setUser={setUser}
							nextStep={() => setStepIndex(1)}
						/>
					</>
				) : null}
				{stepIndex === 1 ? (
					<>
						<p className='text-green-900'>Payment</p>
						<PaymentForm
							user={user}
							setUser={setUser}
							nextStep={() => setStepIndex(2)}
						/>
					</>
				) : null}
				{stepIndex === 2 ? (
					<>
						<p className='text-green-900'>Review</p>
						<Button variant='green' onClick={() => setStepIndex(3)}>
							Next
						</Button>
					</>
				) : null}
				{stepIndex === 3 ? (
					<>
						<p className='text-green-900'>Complete</p>
					</>
				) : null}
			</section>

			<section className='child30'>
				<h2>Order Summary</h2>
				<div className='w-full'>
					{cartProducts.map((product) => (
						<div key={product.upc} className='flex justify-between'>
							<p>
								{product.quantity} x {product.name}
							</p>
							<p>
								${product.avg_price} * {product.quantity}
							</p>
						</div>
					))}
				</div>
				<div className='w-full'>
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
				</div>
			</section>
		</main>
	);
}

const PaymentForm = ({ user, setUser, nextStep }) => {
	const [sameAsBilling, setSameAsBilling] = useState(user.same_as);
	const [payment, setPayment] = useState();

	const saveForm = (e) => {
		e.preventDefault();
		const form = e.target;
		const card_number = form.card_number.value;
		const expiry_date = form.expiry_date.value;
		const cvv = form.cvv.value;

		if (sameAsBilling == 0) {
			const billing_address = form.billing_address.value;
			const billing_city = form.billing_city.value;
			const billing_province = form.billing_province.value;
			const billing_postal = form.billing_postal.value;
			setUser({
				...user,
				billing_address: billing_address,
				billing_city: billing_city,
				billing_province: billing_province,
				billing_postal: billing_postal,
			});
			console.log(billing_address, billing_city, billing_province, billing_postal);
		}
		console.log(card_number, expiry_date, cvv);

		nextStep();
	};

	return (
		<form onSubmit={saveForm} className='flex flex-col gap-4 '>
			<fieldset className='flex flex-wrap gap-4'>
				<legend>Payment Info</legend>
				<div className='child100'>
					<Label htmlFor='card_number'>Card Number</Label>
					<Input
						type='text'
						id='card_number'
						placeholder='Card Number'
						defaultValue={payment != null ? payment.card_number : null}
						onChange={(e) => setPayment({ ...payment, card_number: e.target.value })}
					/>
				</div>
				<div className='child50'>
					<Label htmlFor='expiry_date'>Expiry Date</Label>
					<Input
						type='text'
						id='expiry_date'
						placeholder='Expiry Date'
						onChange={(e) => setPayment({ ...payment, expiry_date: e.target.value })}
					/>
				</div>
				<div className='child50'>
					<Label htmlFor='cvv'>CVV</Label>
					<Input
						type='text'
						id='cvv'
						placeholder='CVV'
						onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
					/>
				</div>
			</fieldset>
			<div className='flex items-center'>
				<Checkbox
					id='shippingSame'
					defaultValue={sameAsBilling}
					label='billing address same as shipping'
					onClick={() => setSameAsBilling(!sameAsBilling)}
				/>
				<Label htmlFor='shippingSame'>Billing Address same as Shipping</Label>
			</div>
			{sameAsBilling == 0 ? (
				<>
					<fieldset className='flex flex-wrap gap-4'>
						<legend>Billing Address</legend>
						<div className='child100'>
							<Label htmlFor='billing_address'>Address</Label>
							<Input
								type='text'
								id='billing_address'
								placeholder='Address'
								defaultValue={user.billing_address}
							/>
						</div>
						<div className='child50'>
							<Label htmlFor='billing_city'>City</Label>
							<Input
								type='text'
								id='billing_city'
								placeholder='City'
								defaultValue={user.billing_city}
							/>
						</div>
						<div className='child50'>
							<Label htmlFor='billing_province'>Province</Label>
							<Input
								type='text'
								id='billing_province'
								placeholder='Province'
								defaultValue={user.billing_province}
							/>
						</div>
						<div className='child50'>
							<Label htmlFor='billing_postal'>Postal Code</Label>
							<Input
								type='text'
								id='billing_postal'
								placeholder='Postal Code'
								defaultValue={user.billing_postal}
							/>
						</div>
					</fieldset>
				</>
			) : null}
		</form>
	);
};

const ShippingForm = ({ user, setUser, nextStep }) => {
	const saveForm = (e) => {
		e.preventDefault();
		const form = e.target;
		const name_first = form.name_first.value;
		const name_last = form.name_last.value;
		const shipping_address = form.shipping_address.value;
		const shipping_city = form.shipping_city.value;
		const shipping_province = form.shipping_province.value;
		const shipping_postal = form.shipping_postal.value;
		console.log(
			name_first,
			name_last,
			shipping_address,
			shipping_city,
			shipping_province,
			shipping_postal
		);
		setUser({
			...user,
			billing_name_first: name_first,
			billing_name_last: name_last,
			shipping_address: shipping_address,
			shipping_city: shipping_city,
			shipping_province: shipping_province,
			shipping_postal: shipping_postal,
		});
		nextStep();
	};

	return (
		<form onSubmit={saveForm} className='flex flex-col gap-4 '>
			<fieldset className='flex flex-wrap gap-4'>
				<legend>Personal Info</legend>
				<div className='child100'>
					<Label htmlFor='email'>Email </Label>
					<Input type='email' id='email' value={user.email} disabled />
				</div>
				<div className='child50'>
					<Label htmlFor='name_first'>First Name</Label>
					<Input
						type='text'
						id='name_first'
						placeholder='First Name'
						defaultValue={user.billing_name_first}
					/>
				</div>
				<div className='child50'>
					<Label htmlFor='name_last'>Last Name</Label>
					<Input
						type='text'
						id='name_last'
						placeholder='Last Name'
						defaultValue={user.billing_name_last}
					/>
				</div>
				<div className='child50'>
					<Label htmlFor='phone'>Phone</Label>
					<Input
						type='tel'
						id='phone'
						placeholder='Last Name'
						defaultValue={user.billing_name_last}
					/>
				</div>
			</fieldset>
			<fieldset className='flex flex-wrap gap-4'>
				<legend>Shipping Address</legend>
				<div className='child100'>
					<Label htmlFor='shipping_address'>Address</Label>
					<Input
						type='text'
						id='shipping_address'
						placeholder='Address'
						defaultValue={user.shipping_address}
					/>
				</div>
				<div className='child50'>
					<Label htmlFor='shipping_city'>City</Label>
					<Input
						type='text'
						id='shipping_city'
						placeholder='City'
						defaultValue={user.shipping_city}
					/>
				</div>
				<div className='child50'>
					<Label htmlFor='shipping_province'>Province</Label>
					<Input
						type='text'
						id='shipping_province'
						placeholder='Province'
						defaultValue={user.shipping_province}
					/>
				</div>
				<div className='child50'>
					<Label htmlFor='shipping_postal'>Postal Code</Label>
					<Input
						type='text'
						id='shipping_postal'
						placeholder='Postal Code'
						defaultValue={user.shipping_postal}
					/>
				</div>
			</fieldset>
			<Button variant='green' type='submit'>
				Next Step
			</Button>
		</form>
	);
};

function CheckoutCart() {
	const [cart, setCart] = useCartContext();
	return (
		<div>
			<h1>Cart</h1>
			<ul>
				{cart.map((item) => (
					<li>{item.name}</li>
				))}
			</ul>
		</div>
	);
}
