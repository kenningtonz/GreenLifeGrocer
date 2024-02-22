import Link from "next/link";
import Image from "next/image";

const Header = () => {
	return (
		<header className='bg-green-500'>
			<nav className='flex justify-between items-center px-1 py-o5 text-white'>
				<Link href='/' className='flex gap-1 items-center '>
					<Image src='/images/logo.png' alt='logo' width={50} height={50} />
					<p className='text28 fontSpecial'>GreenLife Grocer</p>
				</Link>
				<ul className='flex gap-1 text-lg'>
					<li>
						<Link href='/products'>Products</Link>
					</li>
					{/* <li>
                        <Link href="/login">Login</Link>
                    </li> */}
					<li>
						<Link href='/cart'>Cart</Link>
					</li>
					{/* <li>
                        <Link href="/account">Account</Link>
                    </li> */}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
