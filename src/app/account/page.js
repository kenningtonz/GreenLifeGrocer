"use client";
import groceryStore from "@/lib/classes/store";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Account() {
	// const user = groceryStore((state) => state.user);
	const activeSession = groceryStore((state) => state.activeSession);
	const router = useRouter();

	const user = {
		email: "email",
		billing_first_name: "name",
		billing_last_name: "name",
		billing_address: "address",
		billing_city: "city",
		billing_province: "province",
		billing_postal_code: "postal code",
		billing_phone: "phone",
		shipping_first_name: "name",
		shipping_last_name: "name",
		shipping_address: "address",
		shipping_city: "city",
		shipping_province: "province",
		shipping_postal_code: "postal code",
		shipping_phone: "phone",
		sign_up_date: "date",
	};

	function savePersonal(e) {
		e.preventDefault();
		console.log("save personal info");
	}

	// console.log("sessionID", await getSessionCookie());
	// if (activeSession === false) {
	// 	router.push("/account/login");
	// }

	return (
		<main className='bg-olive-100 px-4 py-16 flex justify-center'>
			<section className='max-w-3xl w-full rounded-lg bg-white shadow-sm p-4 '>
				<h1 className='text-2xl font-bold text-green-900 mb-4'>Account</h1>

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
						<p className='text-green-900'>Personal Info</p>
						<form onSubmit={savePersonal} className='gap-4 flex flex-col'>
							<Input type='email' id='email' value={user.email} disabled />
							<Input
								type='text'
								id='name_first'
								placeholder='First Name'
								defaultValue={user.billing_first_name}
							/>
							<Input
								type='text'
								id='name_last'
								placeholder='Last Name'
								defaultValue={user.billing_last_name}
							/>
							<fieldset>
								<legend>Billing Address</legend>
								<Input
									type='text'
									id='billing_address'
									placeholder='Address'
									defaultValue={user.billing_address}
								/>
								<Input
									type='text'
									id='billing_city'
									placeholder='City'
									defaultValue={user.billing_city}
								/>
							</fieldset>
							<Button variant='greenDark' type='submit'>
								Save
							</Button>
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
