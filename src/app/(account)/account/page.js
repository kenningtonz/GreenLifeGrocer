"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserContext } from "@/lib/context/user";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { logoutAccount } from "@/lib/classes/session";
import Loader from "@/components/loader";
// import {se}

export default function Account() {
	const [user, setUser] = useUserContext();
	const [editing, setEditing] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	console.log(user);
	const router = useRouter();

	function savePersonal(e) {
		e.preventDefault();
		const form = e.target;
		const name_first = form.name_first.value;
		const name_last = form.name_last.value;
		const phone = form.phone.value;
		const shipping_address = form.shipping_address.value;
		const shipping_city = form.shipping_city.value;
		const shipping_province = form.shipping_province.value;
		const shipping_postal = form.shipping_postal.value;
		console.log(
			name_first,
			name_last,
			phone,
			shipping_address,
			shipping_city,
			shipping_province,
			shipping_postal
		);
		// save to user object
		setUser({
			...user,
			billing_name_first: name_first,
			billing_name_last: name_last,
			billing_phone: phone,
			shipping_address: shipping_address,
			shipping_city: shipping_city,
			shipping_province: shipping_province,
			shipping_postal: shipping_postal,
		});

		setEditing(false);
	}

	useEffect(() => {
		if (Object.keys(user).length === 0) {
			console.log("user is null");
			router.push("/login");
		}
		setIsMounted(true);
	}, [user]);

	if (!isMounted) {
		return <Loader />;
	}
	return (
		<main className='bg-olive-100 px-4 py-16 flex justify-center min-h-[90dvh]'>
			<section className='max-w-3xl w-full rounded-lg bg-white shadow-sm p-4 '>
				<h1 className='text-3xl text-center font-bold text-green-900 mb-4'>
					Account
				</h1>
				<Button
					variant='green'
					onClick={() => {
						logoutAccount();
						setIsMounted(false);
					}}
				>
					Logout
				</Button>

				<Tabs defaultValue='overview' className=' flex gap-4 mt-2'>
					<TabsList className='flex-col' horizontal={true}>
						<TabsTrigger value='overview'>Overview</TabsTrigger>
						<TabsTrigger value='details'>Personal Info</TabsTrigger>
						<TabsTrigger value='history'>Purchase History</TabsTrigger>
					</TabsList>
					<TabsContent value='overview'>
						<p className='text-green-900'>Welcome to your account</p>
					</TabsContent>
					<TabsContent value='details'>
						{/* <p className='text-green-900 text-2xl'>Personal Info</p> */}
						<form onSubmit={savePersonal} className='flex flex-col gap-4 '>
							{!editing ? (
								<Button variant='green' onClick={() => setEditing(true)}>
									Edit
								</Button>
							) : null}
							{editing ? (
								<Button variant='greenDark' type='submit'>
									Save
								</Button>
							) : null}
							<fieldset className='flex flex-wrap gap-4'>
								<legend className='mb-2'>Personal Info</legend>
								<div className='child100'>
									<label htmlFor='email' className='text-green-900 text-sm ml-3'>
										Email
									</label>
									<Input
										type='email'
										id='email'
										value={user.email}
										disabled
										className='mb-2'
									/>
								</div>
								<div className='child50'>
									<label htmlFor='name_first' className='text-green-900 text-sm ml-3'>
										First Name
									</label>
									<Input
										type='text'
										id='name_first'
										placeholder='First Name'
										defaultValue={user.billing_name_first}
										className='mb-2'
										disabled={!editing}
									/>
								</div>
								<div className='child50'>
									<label htmlFor='name_last' className='text-green-900 text-sm ml-3'>
										Last Name
									</label>
									<Input
										type='text'
										id='name_last'
										placeholder='Last Name'
										defaultValue={user.billing_name_last}
										className='mb-2'
										disabled={!editing}
									/>
								</div>
								<div className='child50'>
									<label htmlFor='phone' className='text-green-900 text-sm ml-3'>
										Phone
									</label>
									<Input
										type='tel'
										id='phone'
										placeholder='Phone'
										defaultValue={user.billing_phone}
										className='mb-2'
										disabled={!editing}
									/>
								</div>
							</fieldset>
							<fieldset className='flex flex-wrap gap-4'>
								<legend className='mb-2'>Shipping Address</legend>
								<div className='child100'>
									<label
										htmlFor='shipping_address'
										className='text-green-900 text-sm ml-3'
									>
										Address
									</label>
									<Input
										type='text'
										id='shipping_address'
										placeholder='Address'
										defaultValue={user.shipping_address}
										className='mb-2'
										disabled={!editing}
									/>
								</div>
								<div className='child50'>
									<label htmlFor='shipping_city' className='text-green-900 text-sm ml-3'>
										City
									</label>
									<Input
										type='text'
										id='shipping_city'
										placeholder='City'
										defaultValue={user.shipping_city}
										className='mb-2'
										disabled={!editing}
									/>
								</div>
								<div className='child50'>
									<label
										htmlFor='shipping_province'
										className='text-green-900 text-sm ml-3'
									>
										Province
									</label>
									<Input
										type='text'
										id='shipping_province'
										placeholder='Province'
										defaultValue={user.shipping_province}
										className='mb-2'
										disabled={!editing}
									/>
								</div>
								<div className='child50'>
									<label
										htmlFor='shipping_postal'
										className='text-green-900 text-sm ml-3'
									>
										Postal Code
									</label>
									<Input
										type='text'
										id='shipping_postal'
										placeholder='Postal Code'
										disabled={!editing}
										defaultValue={user.shipping_postal}
										className='mb-2'
									/>
								</div>
							</fieldset>
						</form>
					</TabsContent>
					<TabsContent value='history'>
						<p className='text-green-900'>Purchase History</p>
					</TabsContent>
				</Tabs>
			</section>
		</main>
	);
}
