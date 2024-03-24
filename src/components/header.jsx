import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/search";
import { UserRound, ShoppingCart } from "lucide-react";
// import groceryStore from "@/lib/classes/store";

const Header = () => {
	// const cart = groceryStore((state) => state.cart);
	return (
		<header className='bg-green-900'>
			<nav className='flex justify-between items-center px-4 py-2 text-white flex-wrap'>
				<Link href='/' className='flex gap-4 items-center '>
					<Image
						src='/images/logo.png'
						alt='logo'
						width={50}
						height={50}
						className='h-auto'
					/>
					<p className='text-2xl fontSpecial'>GreenLife Grocer</p>
				</Link>
				<ul className='flex gap-4 text-lg items-center'>
					<SearchBar />
					<li>
						<Link href='/grocery'>Grocery</Link>
					</li>

					<li>
						<Link href='/account'>
							<UserRound
								size={24}
								color='white'
								className='hover:scale-105 transition-transform'
							/>
						</Link>
					</li>
					<li>
						<Link href='/cart'>
							<ShoppingCart
								size={24}
								color='white'
								className='hover:scale-105 transition-transform'
							/>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
