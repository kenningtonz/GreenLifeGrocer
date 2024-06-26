import "./globals.css";
import "./reset.css";
import "@/css/join.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
// import { getSession } from "@/lib/classes/user";
import Loader from "@/components/loader";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { CartProvider } from "@/lib/context/cart";
import { UserProvider } from "@/lib/context/user";
import { getSession } from "@/lib/classes/session";
import { cookies } from "next/headers";
import { deleteCookie } from "@/lib/classes/cookieNext";
export const metadata = {
	title: "GreenLife Grocer",
	description: "Grocery Store",
};

export default async function RootLayout({ children }) {
	const session = await getSession();
	console.log("session", session);

	let cart = {};
	const cartCookie = cookies().get("cart")?.value;
	try {
		cart = session != null ? user.cart : JSON.parse(cartCookie) ?? {};
	} catch (e) {
		console.log(e);
	}
	// console.log("cartCookie", JSON.parse(cartCookie));
	// const extendSession =
	// 	session.error.id == 0 && Date.now() + 60 * 60 * 3 > session.session.date_end;
	const user = session != null ? session.user : {};
	// const cart = session != null ? user.cart : JSON.parse(cartCookie) ?? {};
	console.log("user", user);
	console.log("cart", cart);
	// console.log(session.session.date_end);
	return (
		<html lang='en'>
			<body className='body'>
				<CartProvider cart={cart}>
					<UserProvider user={user}>
						<Header />
						{/* {extendSession ? (
							<SetSession session={session.session.session_id} />
						) : null} */}
						<Suspense fallback={<Loader />}>{children}</Suspense>
					</UserProvider>
				</CartProvider>
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
