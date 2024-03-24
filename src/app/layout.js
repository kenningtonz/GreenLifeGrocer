import "./globals.css";
import "./reset.css";
import "@/css/join.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
// import { getSession } from "@/lib/classes/user";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { getCookie, setCookie } from "@/lib/classes/cookies";
import { CartProvider } from "@/lib/context/cart";

export const metadata = {
	title: "GreenLife Grocer",
	description: "Grocery Store",
};

export default async function RootLayout({ children }) {
	// await setCookie("name", "kennedy", 60 * 60 * 24 * 7);
	// const cookie = await getCookie("name");
	// console.log(cookie);
	return (
		<html lang='en'>
			<body className='body'>
				<CartProvider cart={[]}>
					<Header />
					<Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
				</CartProvider>

				<Footer />

				<Toaster />
			</body>
		</html>
	);
}
