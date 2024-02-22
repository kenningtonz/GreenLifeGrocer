import ProductCard from "@/components/productCard";
import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

let departments = [
	{ name: "Produce" },
	{ name: "Pantry" },
	{ name: "Bakery" },
	{ name: "Dairy & Eggs" },
	{ name: "Meat & Seafood" },
	{ name: "Frozen" },
	{ name: "Household" },
	{ name: "Health & Beauty" },
	{ name: "Other" },
];

let subDepartments = [
	{ name: "Baking" },
	{ name: "Canned" },
	{ name: "Cereal" },
	{ name: "Dry" },
	{ name: "Pasta" },
	{ name: "Spices" },
	{ name: "Snacks" },
];

export default function Products() {
	return (
		<main>
			<div className='my-1 flex justify-stretch flex-wrap'>
				{departments.map((department) => {
					return (
						<Button
							asChild
							variant='green'
							className='flex-1 join-item'
							rounded='none'
						>
							<Link href={`#/department/${department.name}`}>{department.name}</Link>
						</Button>
					);
				})}
			</div>

			<div className=' flex justify-stretch flex-wrap'>
				{subDepartments.map((department) => {
					return (
						<Button
							asChild
							variant='green'
							className=' flex-auto join-item'
							rounded='none'
						>
							<Link href={`#/department/${department.name}`}>{department.name}</Link>
						</Button>
					);
				})}
			</div>

			<section className='flex spaceBetween p1'>
				{/* <Breadcrumbs
                    containerClasses='flex py-5 bg-gradient-to-r from-purple-600 to-blue-600'
                /> */}
				<div className='child50 text-sm breadcrumbs'>
					<ul>
						<li>
							<a>Home</a>
						</li>
						<li>
							<a>Products</a>
						</li>
						<li>
							<a>Pantry</a>
						</li>
						<li>Baked Goods</li>
					</ul>
				</div>

				<section>
					<div className='searchBar'>
						<input type='text' placeholder='Search..' name='search' />
						<button type='submit'>S</button>
					</div>
					<div className='sortBy'></div>
				</section>
			</section>

			<section className='p-1 bg-green-gradient'>
				<div className='flex flex-wrap gap-1 '>
					<ProductCard
						upc='16000329904'
						name='Frosting, Butter Cream'
						cost='2.99'
						brand='Betty Crocker'
					/>
					<ProductCard
						upc='34000146000'
						name='Milk Chocolate Chips'
						cost='2.99'
						brand="Hershey's"
					/>
					<ProductCard
						upc='43000253403'
						name='Baking Chocolate Squares, Semi-Sweet'
						cost='2.99'
						brand="Baker's"
					/>
					<ProductCard
						upc='16000409897'
						name='Cake Mix, Chocolate Fudge'
						cost='2.99'
						brand='Betty Crocker'
					/>
					<ProductCard
						upc='16000409910'
						name='Cake Mix, French Vanilla'
						cost='2.99'
						brand='Betty Crocker'
					/>
					<ProductCard
						upc='34000141340'
						name='Chocolate Chips, Sugar Free'
						cost='2.99'
						brand='Betty Crocker'
					/>
					<ProductCard
						upc='43000254196'
						name='Pie Crust, Grahams'
						cost='2.99'
						brand="Baker's"
					/>
					<ProductCard
						upc='44000048334'
						name='White Chocolate Chunks'
						cost='2.99'
						brand='Honey Maid'
					/>
				</div>

				<Pagination className='mt-1'>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href='#' />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href='#'>1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href='#' isActive>
								2
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href='#'>3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href='#' />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</section>
		</main>
	);
}
