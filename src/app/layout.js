import "./globals.css";
import "./reset.css";
import "@/css/join.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
// import { getSession } from "@/lib/classes/user";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { CartProvider } from "@/lib/context/cart";
import { UserProvider } from "@/lib/context/user";
import { getSession } from "@/lib/classes/session";
import { getUser } from "@/lib/classes/user";
import { cookies } from "next/headers";
import { auth } from "@/lib/classes/local";
export const metadata = {
	title: "GreenLife Grocer",
	description: "Grocery Store",
};

export default async function RootLayout({ children }) {
	// const session = await getSession();
	// console.log(session);
	// const cookie = cookies().get("session")?.value;

	return (
		<html lang='en'>
			<body className='body'>
				<CartProvider cart={[]}>
					<UserProvider user={{}}>
						<Header />
						<Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
					</UserProvider>
				</CartProvider>
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
