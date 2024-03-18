import "./globals.css";
import "./reset.css";
import "@/css/join.css";
import "@/css/breadcrumbs.css";
import "@/css/join.css";
import "@/css/link.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { departmentInit } from "@/lib/classes/category";
export const metadata = {
	title: "GreenLife Grocer",
	description: "Grocery Store",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
