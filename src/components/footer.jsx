import Link from "next/link";

import Image from "next/image";
const Footer = () => {
	const accountLinks = ["Sign In", "Create", "Cart", "My Account"];

	return (
		<>
			<footer className='sm:flex-row flex-col gap-x-10 gap-y-10 text-sm flex w-full place-items-start p-10 bg-green-900 text-green-100'>
				<nav className=' grid  gap-1'>
					<h6 className='mb-2 font-bold uppercase opacity-60'>Departments</h6>
					<Link
						href={"/grocery/produce"}
						className='focus:outline-none focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-current cursor-pointer no-underline [@media(hover:hover)]:hover:underline'
					>
						Produce
					</Link>
					<a className='link link-hover'>Meat</a>
					<a className='link link-hover'>Pantry</a>
					<a className='link link-hover'>Dairy & Eggs</a>
					<a className='link link-hover'>Bakery</a>
					<a className='link link-hover'>Frozen</a>
					<a className='link link-hover'>Household</a>
					<a className='link link-hover'>Health & Beauty</a>
					<a className='link link-hover'>Other</a>
				</nav>
				<nav className=' grid  gap-1'>
					<h6 className='mb-2 font-bold uppercase opacity-60'>Account</h6>
					{accountLinks.map((link) => (
						<Link
							href={`/account/${link.toLowerCase()}`}
							key={link}
							className='focus:outline-none focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-current cursor-pointer no-underline [@media(hover:hover)]:hover:underline'
						>
							{link}
						</Link>
					))}
				</nav>
			</footer>
			<footer className='sm:grid-flow-row grid-flow-column  gap-x-4 gap-y-10 text-sm grid w-full place-items-start px-10 py-4 border-t bg-green-900 text-green-100 border-green-600'>
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
			</footer>
		</>
	);
};

export default Footer;
