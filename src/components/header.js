import Link from "next/link";
import Image from "next/image";

const Header = () => {
    return (
        <header className="BGgreenDark">
            <nav className="flex spaceBetween alignCenter">
                <Link href="/" className="flex gap1 alignCenter">
                    <Image src="/images/logo.png" alt="logo" width={50} height={50} />
                    <p className="text28 fontSpecial">GreenLife Grocer</p>
                </Link>
                <ul className="flex gap1">
                    <li>
                        <Link href="/products">Products</Link>
                    </li>
                    {/* <li>
                        <Link href="/login">Login</Link>
                    </li> */}
                    <li>
                        <Link href="/cart">Cart</Link>
                    </li>
                    {/* <li>
                        <Link href="/account">Account</Link>
                    </li> */}
                </ul>
            </nav>
        </header>

    )
}

export default Header;