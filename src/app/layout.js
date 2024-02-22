import "./globals.css";
import "./reset.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
