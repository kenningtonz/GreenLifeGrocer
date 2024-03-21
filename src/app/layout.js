import "./globals.css";
import "./reset.css";
import "@/css/join.css";
import "@/css/join.css";
import "@/css/link.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getSession } from "@/lib/classes/user";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
	title: "GreenLife Grocer",
	description: "Grocery Store",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className='body'>
				<Header />
				{children}
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
