"use client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserContext } from "@/lib/context/user";
import { useState, useEffect } from "react";
import { logoutAccount } from "@/lib/classes/session";
import Loader from "@/components/loader";
import ShippingForm from "@/components/forms/shippingForm";
import { getInvoices, updateUser } from "@/lib/classes/user";
import PurchaseHistory from "@/components/purchaseHistory";
import { fetchData } from "@/lib/db";

export default function Account() {
	const [user, setUser] = useUserContext();
	const [isMounted, setIsMounted] = useState(false);
	const [invoiceData, setInvoiceData] = useState(null);
	const router = useRouter();
	const { toast } = useToast();

	function savePersonal() {
		updateUser(user);
		toast({
			variant: "green",
			title: "Saved User Info",
		});
	}
	useEffect(() => {
		async function getInvoiceData() {
			const data = await fetchData(getInvoices, user.id);
			setInvoiceData(data);
			console.log(data);
		}

		if (Object.keys(user).length === 0) {
			console.log("user is null");
			router.push("/login");
		} else {
			setIsMounted(true);
			getInvoiceData();
		}
	}, [user]);

	if (!isMounted) {
		return <Loader />;
	}
	return (
		<main className='mainGreenCenter px-4 py-16'>
			<section className='card max-w-3xl w-full min-h-[500px] relative  '>
				<h1 className='text-3xl text-center font-bold text-green-900 mb-8'>
					Welcome {user.shipping_name_first}
				</h1>
				<Button
					variant='green'
					className='absolute top-4 right-4'
					onClick={() => {
						logoutAccount();
						setIsMounted(false);
						setUser({});
					}}
				>
					Logout
				</Button>

				<Tabs defaultValue='overview' className='  gap-4 mt-2 transition-[height] '>
					<TabsList className='' horizontal={false}>
						<TabsTrigger value='overview'>Overview</TabsTrigger>
						<TabsTrigger value='details'>Personal Info</TabsTrigger>
						<TabsTrigger value='history'>Purchase History</TabsTrigger>
					</TabsList>
					<TabsContent value='overview' className='p-4'>
						<p className='text-green-900'>Welcome to your account</p>
					</TabsContent>
					<TabsContent value='details' className='p-4'>
						<ShippingForm
							user={user}
							setUser={setUser}
							extraFunction={savePersonal}
							isGuest={false}
							required={false}
							buttonText={"Save"}
						/>
					</TabsContent>
					<TabsContent value='history' className='p-4'>
						<PurchaseHistory invoiceData={invoiceData} />
					</TabsContent>
				</Tabs>
			</section>
		</main>
	);
}
