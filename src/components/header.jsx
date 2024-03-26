"use client";
import Link from "next/link";
import Image from "next/image";
import { getFamilies, getCategories } from "@/lib/classes/category";
import SearchBar from "@/components/search";
import { UserRound, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/lib/context/cart";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
// import groceryStore from "@/lib/classes/store";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown";

const Header = () => {
	const [cart, setCart] = useCartContext();
	const [groceryDropdown, setGroceryDropdown] = useState(false);
	const [departments, setDepartments] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getCategories();
				setDepartments(result.categories);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);
	const router = useRouter();
	// const cart = groceryStore((state) => state.cart);
	const { toast } = useToast();
	return (
		<header className='bg-green-900'>
			<nav className=' flex sm:justify-between items-center px-4 py-2 text-white flex-wrap sm:gap-4 gap-2 justify-center'>
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
				<SearchBar />

				<ul className='flex items-center gap-4 py-2'>
					<li>
						<DropdownMenu open={groceryDropdown}>
							<DropdownMenuTrigger
								className='flex items-center cursor-pointer z-20'
								onMouseEnter={() => setGroceryDropdown(true)}
							>
								Grocery
								<ChevronDown
									size={24}
									className={`transition-transform ${
										groceryDropdown ? "rotate-180" : ""
									}`}
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								onMouseLeave={() => setGroceryDropdown(false)}
								className='font-normal bg-green-900 -mt-2 pt-2 z-10'
							>
								{departments.map((department, index) => {
									return (
										<DropdownMenuItem
											key={`${department.name}-${index}-header`}
											className={"text-white hover:underline"}
										>
											<Link href={`/grocery/${department.url}`}>{department.name}</Link>
										</DropdownMenuItem>
									);
								})}
							</DropdownMenuContent>
						</DropdownMenu>
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
							size={24}
							color='white'
							className='hover:scale-105 transition-transform cursor-pointer'
						/>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
