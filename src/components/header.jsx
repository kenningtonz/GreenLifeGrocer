import Link from "next/link";
import Image from "next/image";

const Header = () => {
	return (
		<header className='bg-green-900'>
			<nav className='flex justify-between items-center px-4 py-2 text-white'>
				<Link href='/' className='flex gap-4 items-center '>
					<Image src='/images/logo.png' alt='logo' width={50} height={50} />
					<p className='text-2xl fontSpecial'>GreenLife Grocer</p>
				</Link>
				<ul className='flex gap-4 text-lg'>
					<li>
						<Link href='/products'>Products</Link>
					</li>
					<li>
						<Link href='account/login'>Login</Link>
					</li>
					{/* <li>
						<Link href='/cart'>Cart</Link>
					</li> */}
					{/* <li>
                        <Link href="/account">Account</Link>
                    </li> */}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
