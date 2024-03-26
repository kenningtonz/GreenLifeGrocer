import Link from "next/link";

import Image from "next/image";
const Footer = () => {
	const accountLinks = [
		["account", "Account"],
		["cart", "Cart"],
		["create", "Create Account"],
		["login", "Login"],
	];
	const departments = [
		["baby", "Baby"],
		["bakery", "Bakery"],
		["dairy-and-eggs", "Dairy & Eggs"],
		["frozen", "Frozen"],
		["health", "Health"],
		["household", "Household"],
		["meat", "Meat"],
		["pantry", "Pantry"],
		["pet", "Pet"],
		["sauces", "Sauces"],
		["snacks", "Snacks"],
	];

	return (
		<>
			<footer className='sm:flex-row flex-col gap-x-16 gap-y-10 text-sm flex w-full place-items-start p-10 bg-green-900 text-green-100'>
				<nav className=' grid  gap-1'>
					<h6 className='mb-2 font-bold uppercase opacity-60'>Departments</h6>
					<ul className='grid grid-cols-3  gap-y-1'>
						{departments.map((department) => (
							<li key={department[0]}>
								<Link
									href={`/grocery/${department[0]}`}
									className='focus:outline-none focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-current cursor-pointer no-underline [@media(hover:hover)]:hover:underline'
								>
									{department[1]}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<nav className=' grid  gap-1'>
					<h6 className='mb-2 font-bold uppercase opacity-60'>Account</h6>
					<ul className='grid grid-cols-1  gap-y-1'>
						{accountLinks.map((link) => (
							<li key={link[0]}>
								<Link
									href={`/grocery/${link[0]}`}
									className='focus:outline-none focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-current cursor-pointer no-underline [@media(hover:hover)]:hover:underline'
								>
									{link[1]}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</footer>

			<footer className='sm:grid-flow-row grid-flow-column  gap-x-4  text-sm grid w-full place-items-start px-10  py-4 border-t bg-green-900 text-green-100 border-green-600'>
				<aside className='items-center grid-flow-col grid  gap-2 '>
					<Image
						src='/images/logo.png'
						alt='logo'
						width={50}
						height={50}
						className='w-auto'
					/>
					<p>
						GreenLife Grocer &copy; 2024 <br />
						Nourishing You Body, Nurturing the Planet
					</p>
				</aside>
				<a
					className='mt-2 text-xs text-green-100'
					href='https://www.flaticon.com/packs/supermarket-109'
					title='department icons'
				>
					Department icons created by iconixar - Flaticon
				</a>
			</footer>
		</>
	);
};

export default Footer;
