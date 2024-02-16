import { Inter } from "next/font/google";
import "./globals.css";
import "./reset.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GreenLife Grocer",
  description: "Grocery Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>

    </html>
  );
}
