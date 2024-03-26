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
import { getProductsByCart, completePurchase } from "@/lib/classes/cart";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/classes/user";

export default function Checkout() {
	const [isMounted, setIsMounted] = useState(false);
	const [user, setUser] = useUserContext();
	const [stepIndex, setStepIndex] = useState(0);
	const [cart, setCart] = useCartContext();
	const [cartProducts, setCartProducts] = useState([]);
	const router = useRouter();
	const [paymentInfo, setPaymentInfo] = useState();
	const [invoice, setInvoice] = useState();

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
		} else {
			fetchData();
		}
		setIsMounted(true);
	}, []);

	const complete = async (e) => {
		e.preventDefault();
		console.log("complete");
		const result = await completePurchase(cart, user.id);
		if (result.error.id == 0) {
			setCart({});
			setInvoice(result);
			setStepIndex(3);
		}
		console.log(result);
	};

	const steps = ["Shipping", "Payment", "Review", "Complete"];

	if (!isMounted) {
		return <Loader />;
	}
	return (
		<main className='flex-col p-4 mainGreenCenter gap-4'>
			<Link href='/cart' className=' self-start'>
				<Button variant='default' className='shadow' press={"pressed"}>
					Back to Cart
				</Button>
			</Link>
			<h1 className='text-3xl text-center child100'>Checkout</h1>
			<ul className='flex gap-8 child100 justify-center mb-4 '>
				{steps.map((step, index) => (
					<li className='relative flex flex-col items-center' key={index}>
						<div
							aria-hidden={true}
							data-active={stepIndex == index}
							className='h-5 w-5 rounded-full data-[active=false]:bg-pink-100 data-[active=true]:bg-pink z-20'
						></div>
						{index != steps.length - 1 ? (
							<div
								aria-hidden={true}
								className=' absolute left-1/2 top-[9px] w-24 h-[2px] bg-pink-900 z-10'
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
			{stepIndex != 3 ? <OrderSummary cartProducts={cartProducts} /> : null}

			<section className='p-4 w-full bg-white rounded-lg shadow shadow-olive-500 '>
				{stepIndex === 0 ? (
					<>
						<ShippingForm
							user={user}
							setUser={setUser}
							nextStep={() => setStepIndex(1)}
						/>
					</>
				) : null}
				{stepIndex === 1 ? (
					<>
						<PaymentForm
							user={user}
							setUser={setUser}
							setPaymentInfo={setPaymentInfo}
							nextStep={() => setStepIndex(2)}
						/>
					</>
				) : null}
				{stepIndex === 2 ? (
					<>
						<div className='mb-4'>
							<h3 className='text-xl text-green-800 font-semibold'>Personal Info</h3>
							<p className=''>
								{user.shipping_name_first} {user.shipping_name_last}
							</p>
							<p>{user.email}</p>
							<p>{user.shipping_phone}</p>
						</div>

						<div className='mb-4'>
							<h3 className='text-xl text-green-800 font-semibold'>Shipping</h3>
							<p>
								{user.shipping_name_first} {user.shipping_name_last}
							</p>
							<p>{user.shipping_address}</p>
							<p>
								{user.shipping_city} , {user.shipping_province} ,{" "}
								{user.shipping_postal_code}
							</p>
						</div>
						<div className='mb-4'>
							<h3 className='text-xl text-green-800 font-semibold'>Payment Info</h3>
							<p>
								Card Number: **** **** ****{" "}
								{paymentInfo.card_number.substr(paymentInfo.card_number.length - 4)}
							</p>
							<p>Expiry Date: {paymentInfo.expiry_date} </p>
							<p>CVV: {paymentInfo.cvv} </p>
						</div>
						<Button
							className='w-full shadow'
							press={"pressed"}
							onClick={(e) => complete(e)}
						>
							Complete Purchase
						</Button>
					</>
				) : null}
				{stepIndex === 3 ? (
					<>
						<h3 className='text-xl text-green-800 font-semibold text-center mb-2'>
							Order Complete!
						</h3>

						{invoice != null ? <Receipt invoice={invoice} user={user} /> : null}
						<Button
							className='w-full shadow'
							press={"pressed"}
							onClick={() => router.push("/")}
						>
							Home
						</Button>
					</>
				) : null}
			</section>
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

const Receipt = ({ invoice, user }) => {
	return (
		<>
			<section className='flex gap-4 justify-between px-4'>
				<div>
					<p>Invoice ID: {invoice.invoice_id}</p>
					<p>Order Date: {invoice.date}</p>
				</div>
				<div>
					<h3 className='text-xl text-green-800 font-semibold'>Billed To:</h3>
					<p>
						{user.billing_name_first} {user.billing_name_last}
					</p>
					<p>{user.billing_address}</p>
					<p>
						{user.billing_city} , {user.billing_province} , {user.billing_postal_code}
					</p>
				</div>
				<div>
					<h3 className='text-xl text-green-800 font-semibold'>Shipped To:</h3>
					<p>
						{user.shipping_name_first} {user.shipping_name_last}
					</p>
					<p>{user.shipping_address}</p>
					<p>
						{user.shipping_city} , {user.shipping_province} ,{" "}
						{user.shipping_postal_code}
					</p>
				</div>
			</section>
			<table className='w-full'>
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{invoice.products.map((product, index) => (
						<tr key={`${product.product_name}-${index}`}>
							<td>{product.product_name}</td>
							<td>{product.quantity}</td>
							<td>${product.avg_price}</td>
							<td>${product.avg_price * product.quantity}</td>
						</tr>
					))}
				</tbody>
			</table>
			<section className='flex flex-col gap-1 self-end w-1/3'>
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

const PaymentForm = ({ user, setUser, nextStep, setPaymentInfo }) => {
	const [sameAsShipping, setsameAsShipping] = useState(user.same_as != 0);
	const [payment, setPayment] = useState({
		card_number: null,
		expiry_date: null,
		cvv: null,
	});

	const [billing, setBilling] = useState({
		billing_name_first: user.billing_name_first ?? null,
		billing_name_last: user.billing_name_last ?? null,
		billing_address: user.billing_address ?? null,
		billing_city: user.billing_city ?? null,
		billing_province: user.billing_province ?? null,
		billing_postal_code: user.billing_postal_code ?? null,
	});

	const saveForm = (e) => {
		e.preventDefault();
		const form = e.target;
		const card_number = form.card_number.value;
		const expiry_date = form.expiry_date.value;
		const cvv = form.cvv.value;
		setPaymentInfo({ card_number, expiry_date, cvv });

		if (sameAsShipping == 0) {
			const billing_name_first = form.name_first.value;
			const billing_name_last = form.name_last.value;
			const billing_address = form.billing_address.value;
			const billing_city = form.billing_city.value;
			const billing_province = form.billing_province.value;
			const billing_postal_code = form.billing_postal_code.value;
			setUser({
				...user,
				same_as: sameAsShipping ? 1 : 0,
				billing_name_first: billing_name_first,
				billing_name_last: billing_name_last,
				billing_address: billing_address,
				billing_city: billing_city,
				billing_province: billing_province,
				billing_postal_code: billing_postal_code,
			});
			console.log(
				billing_address,
				billing_city,
				billing_province,
				billing_postal_code
			);
		} else {
			setUser({
				...user,
				same_as: sameAsShipping ? 1 : 0,
			});
		}
		console.log(card_number, expiry_date, cvv);
		updateUser(user).then((res) => console.log(res));
		nextStep();
	};
	console.log(sameAsShipping);

	return (
		<form onSubmit={saveForm} className='flex flex-col gap-4 '>
			<fieldset className='flex flex-wrap gap-4'>
				<legend className='text-xl text-green-800 font-semibold'>
					Payment Info
				</legend>
				<div className='child100'>
					<Label htmlFor='card_number'>Card Number</Label>
					<Input
						required
						type='text'
						id='card_number'
						placeholder='Card Number'
						defaultValue={payment.card_number ?? null}
						onChange={(e) => setPayment({ ...payment, card_number: e.target.value })}
					/>
				</div>
				<div className='child50'>
					<Label htmlFor='expiry_date'>Expiry Date</Label>
					<Input
						required
						type='text'
						id='expiry_date'
						placeholder='Expiry Date'
						defaultValue={payment.expiry_date ?? null}
						onChange={(e) => setPayment({ ...payment, expiry_date: e.target.value })}
					/>
				</div>
				<div className='child50'>
					<Label htmlFor='cvv'>CVV</Label>
					<Input
						required
						type='text'
						id='cvv'
						placeholder='CVV'
						defaultValue={payment.cvv ?? null}
						onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
					/>
				</div>
			</fieldset>
			<div className='flex items-center gap-2'>
				<Checkbox
					id='shippingSame'
					defaultValue={sameAsShipping}
					label='billing address same as shipping'
					onClick={() => setsameAsShipping(!sameAsShipping)}
				/>
				<Label htmlFor='shippingSame'>Billing Address same as Shipping</Label>
			</div>
			{!sameAsShipping ? (
				<>
					<fieldset className='flex flex-wrap gap-4'>
						<legend className='text-xl text-green-800 font-semibold'>Billing</legend>
						<div className='child50'>
							<Label htmlFor='billing_name_first'>First Name</Label>
							<Input
								type='text'
								required={sameAsShipping ? false : true}
								id='billing_name_first'
								placeholder='First Name'
								defaultValue={billing.billing_name_first}
								onChange={(e) =>
									setBilling({ ...billing, billing_name_first: e.target.value })
								}
							/>
						</div>
						<div className='child50'>
							<Label htmlFor='billing_name_last'>Last Name</Label>
							<Input
								required={sameAsShipping ? false : true}
								type='text'
								id='billing_name_last'
								placeholder='Last Name'
								defaultValue={billing.billing_name_last}
								onChange={(e) =>
									setBilling({ ...billing, billing_name_last: e.target.value })
								}
							/>
						</div>
						<div className='child100'>
							<Label htmlFor='billing_address'>Address</Label>
							<Input
								type='text'
								id='billing_address'
								placeholder='Address'
								defaultValue={billing.billing_address}
								onChange={(e) =>
									setBilling({ ...billing, billing_address: e.target.value })
								}
							/>
						</div>
						<div className='child50'>
							<Label htmlFor='billing_city'>City</Label>
							<Input
								type='text'
								required={sameAsShipping ? false : true}
								id='billing_city'
								placeholder='City'
								defaultValue={billing.billing_city}
								onChange={(e) =>
									setBilling({ ...billing, billing_city: e.target.value })
								}
							/>
						</div>
						<div className='child50'>
							<Label htmlFor='billing_province'>Province</Label>
							<Input
								type='text'
								required={sameAsShipping ? false : true}
								id='billing_province'
								placeholder='Province'
								defaultValue={billing.billing_province}
								onChange={(e) =>
									setBilling({ ...billing, billing_province: e.target.value })
								}
							/>
						</div>
						<div className='child50'>
							<Label htmlFor='billing_postal_code'>Postal Code</Label>
							<Input
								type='text'
								id='billing_postal_code'
								required={sameAsShipping ? false : true}
								placeholder='Postal Code'
								defaultValue={billing.billing_postal_code}
								onChange={(e) =>
									setBilling({ ...billing, billing_postal_code: e.target.value })
								}
							/>
						</div>
					</fieldset>
				</>
			) : null}
			<Button press={"pressed"} className='shadow' type='submit'>
				Next Step
			</Button>
		</form>
	);
};

const ShippingForm = ({ user, setUser, nextStep }) => {
	const saveForm = (e) => {
		e.preventDefault();
		const form = e.target;
		const name_first = form.name_first.value;
		const name_last = form.name_last.value;
		const phone = form.phone.value;
		const shipping_address = form.shipping_address.value;
		const shipping_city = form.shipping_city.value;
		const shipping_province = form.shipping_province.value;
		const shipping_postal_code = form.shipping_postal_code.value;
		console.log(
			name_first,
			name_last,
			shipping_address,
			shipping_city,
			shipping_province,
			shipping_postal_code
		);
		setUser({
			...user,
			shipping_name_first: name_first,
			shipping_name_last: name_last,
			shipping_phone: phone,
			shipping_address: shipping_address,
			shipping_city: shipping_city,
			shipping_province: shipping_province,
			shipping_postal_code: shipping_postal_code,
		});

		nextStep();
	};

	return (
		<form onSubmit={saveForm} className='flex flex-col gap-4 '>
			<fieldset className='flex flex-wrap gap-4'>
				<legend className='text-xl text-green-800 font-semibold'>
					Personal Info
				</legend>
				<div className='child100'>
					<Label htmlFor='email'>Email </Label>
					<Input type='email' id='email' value={user.email} disabled />
				</div>
				<div className='child50'>
					<Label htmlFor='name_first'>First Name</Label>
					<Input
						type='text'
						required
						id='name_first'
						placeholder='First Name'
						defaultValue={user.shipping_name_first}
					/>
				</div>
				<div className='child50'>
					<Label htmlFor='name_last'>Last Name</Label>
					<Input
						type='text'
						id='name_last'
						required
						placeholder='Last Name'
						defaultValue={user.shipping_name_first}
					/>
				</div>
				<div className='child50'>
					<Label htmlFor='phone'>Phone</Label>
					<Input
						type='tel'
						required
						id='phone'
						placeholder='phone'
						defaultValue={user.shipping_phone}
					/>
				</div>
			</fieldset>
			<fieldset className='flex flex-wrap gap-4'>
				<legend className='text-xl text-green-800 font-semibold'>
					Shipping Address
				</legend>
				<div className='child100'>
					<Label htmlFor='shipping_address'>Address</Label>
					<Input
						type='text'
						required
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
						required
						placeholder='City'
						defaultValue={user.shipping_city}
					/>
				</div>
				<div className='child50'>
					<Label htmlFor='shipping_province'>Province</Label>
					<Input
						type='text'
						id='shipping_province'
						required
						placeholder='Province'
						defaultValue={user.shipping_province}
					/>
				</div>
				<div className='child50'>
					<Label htmlFor='shipping_postal_code'>Postal Code</Label>
					<Input
						type='text'
						id='shipping_postal_code'
						placeholder='Postal Code'
						required
						defaultValue={user.shipping_postal_code}
					/>
				</div>
			</fieldset>
			<Button press={"pressed"} className='shadow' type='submit'>
				Next Step
			</Button>
		</form>
	);
};
