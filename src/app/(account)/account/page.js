"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserContext } from "@/lib/context/user";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { getLocal } from "@/lib/classes/local";
import Cookies from "js-cookie";
import { getSession } from "@/lib/classes/session";
import { auth } from "@/lib/classes/local";

export default function Account() {
	const [user, setUser] = useUserContext();
	const [editing, setEditing] = useState(false);
	console.log(user);
	const router = useRouter();
	// const getCookie = async () => {
	// 	return Cookies.get("session");
	// };
	// getCookie().then((cookie) => {
	// 	console.log(cookie);
	// });

	function savePersonal(e) {
		e.preventDefault();
		console.log("save personal info");
		setEditing(false);
	}

	useEffect(() => {
		const getUserData = async () => {
			const authData = await auth();
			console.log(authData);
			return authData;
		};
		getUserData().then((data) => {
			console.log(data);
		});
		if (Object.keys(user).length === 0) {
			console.log("user is null");
			router.push("/login");
		}
	}, []);

	return (
		<main className='bg-olive-100 px-4 py-16 flex justify-center min-h-[90dvh]'>
			<section className='max-w-3xl w-full rounded-lg bg-white shadow-sm p-4 '>
				<h1 className='text-3xl text-center font-bold text-green-900 mb-4'>
					Account
				</h1>

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
							</fieldset>
							<fieldset className='flex flex-wrap gap-4'>
								<legend className='mb-2'>Billing Address</legend>
								<div className='child100'>
									<label
										htmlFor='billing_address'
										className='text-green-900 text-sm ml-3'
									>
										Address
									</label>
									<Input
										type='text'
										id='billing_address'
										placeholder='Address'
										defaultValue={user.billing_address}
										className='mb-2'
										disabled={!editing}
									/>
								</div>
								<div className='child50'>
									<label htmlFor='billing_city' className='text-green-900 text-sm ml-3'>
										City
									</label>
									<Input
										type='text'
										id='billing_city'
										placeholder='City'
										defaultValue={user.billing_city}
										className='mb-2'
										disabled={!editing}
									/>
								</div>
								<div className='child50'>
									<label
										htmlFor='billing_province'
										className='text-green-900 text-sm ml-3'
									>
										Province
									</label>
									<Input
										type='text'
										id='billing_province'
										placeholder='Province'
										defaultValue={user.billing_province}
										className='mb-2'
										disabled={!editing}
									/>
								</div>
								<div className='child50'>
									<label
										htmlFor='billing_postal'
										className='text-green-900 text-sm ml-3'
									>
										Postal Code
									</label>
									<Input
										type='text'
										id='billing_postal'
										placeholder='Postal Code'
										disabled={!editing}
										defaultValue={user.billing_postal}
										className='mb-2'
									/>
								</div>
							</fieldset>
							<div className='flex items-center'>
								<Checkbox
									id='shippingSame'
									label='Shipping same as billing'
									disabled={!editing}
								/>
								<label htmlFor='shippingSame' className='text-green-900 text-sm ml-3'>
									Shipping Address same as Billing
								</label>
							</div>
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
