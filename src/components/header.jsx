"use client";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/classes/category";
import { fetchData } from "@/lib/db";
import SearchBar from "@/components/search";
import { UserRound, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/lib/context/cart";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Header = () => {
	const [cart, setCart] = useCartContext();
	const cartIndicator = useRef();
	const [groceryDropdown, setGroceryDropdown] = useState(false);
	const [departments, setDepartments] = useState([]);
	useEffect(() => {
		fetchData(getCategories).then((data) => {
			if (typeof data === "string") {
				console.log(data);
			} else {
				setDepartments(data.categories);
			}
		});
	}, []);
	const router = useRouter();
	const { toast } = useToast();
	return (
		<header className='bg-green-900'>
			<nav className='m-auto flex sm:flex-row flex-col sm:justify-between items-center px-4 py-2 text-white flex-wrap sm:gap-4 gap-2 justify-center max-w-[1200px]'>
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
				<SearchBar className={"order-3 sm:order-2"} />

				<ul className='flex items-center gap-4 py-2 order-2 sm:order-3'>
					{departments.length > 0 ? (
						<li className='relative '>
							<p
								className='flex items-center cursor-pointer z-50'
								onMouseEnter={() => setGroceryDropdown(true)}
							>
								Grocery{" "}
								<ChevronDown
									size={24}
									className={`transition-transform ${
										groceryDropdown ? "rotate-180" : ""
									}`}
								/>
							</p>
							{groceryDropdown ? (
								<div
									className='absolute top-8 left-0 w-full bg-green-900 min-w-[160px] p-2 rounded-b-lg z-50'
									onMouseLeave={() => setGroceryDropdown(false)}
								>
									<ul>
										{departments.map((department, index) => {
											return (
												<li
													key={`${department.name}-${index}-header`}
													className={"text-white hover:underline p-1"}
												>
													<Link href={`/grocery/${department.url}`}>{department.name}</Link>
												</li>
											);
										})}
									</ul>
								</div>
							) : null}
						</li>
					) : null}
					<li className='z-50'>
						<Link href='/account'>
							<UserRound
								size={28}
								color='white'
								className='hover:scale-105 transition-transform'
							/>
						</Link>
					</li>

					<li className='z-50 relative hover:scale-105 transition-transform cursor-pointer'>
						<ShoppingCart
							onClick={() =>
								Object.keys(cart).length > 0
									? router.push("/cart")
									: toast({
											variant: "pink",
											title: "No items in Cart",
											description: "Add items to cart to view them",
									  })
							}
							size={28}
							// fill='currentColor'
							color='white'
							className=''
						/>
						{Object.keys(cart).length == 0 ? null : (
							<p
								ref={cartIndicator}
								className='absolute -top-3  -right-2.5 text-white rounded-full bg-pink-500 px-1.5 py-0.5 font-bold'
							>
								{Object.keys(cart).length}
							</p>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
