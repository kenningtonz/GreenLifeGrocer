"use client";
import groceryStore from "@/lib/classes/store";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Account() {
	const activeSession = groceryStore((state) => state.activeSession);
	const router = useRouter();

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
					</TabsContent>
					<TabsContent value='history'>
						<p className='text-green-900'>Purchase History</p>
					</TabsContent>
				</Tabs>
			</section>
		</main>
	);
}
