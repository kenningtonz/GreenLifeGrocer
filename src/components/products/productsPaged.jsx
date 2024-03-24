"use client";
import { useSearchParams, usePathname } from "next/navigation";
import { getSearch } from "@/lib/classes/search";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "@/components/products/productCard";

const PagedProducts = (products, productsPerPage) => {
	const pagedProducts = [];
	if (products.length > 0) {
		for (let i = 0; i < products.length; i += productsPerPage) {
			pagedProducts.push(products.slice(i, i + productsPerPage));
		}
	}
	return pagedProducts;
};

const SortProducts = (products, sort) => {
	const sortedProducts = products.sort((a, b) => {
		if (sort === "priceLtoH") {
			return a.avg_price - b.avg_price;
		}
		if (sort === "priceHtoL") {
			return b.avg_price - a.avg_price;
		}
		if (sort === "asc") {
			return a.product_name.localeCompare(b.product_name);
		}
		if (sort === "desc") {
			return b.product_name.localeCompare(a.product_name);
		}
		if (sort === "rating") {
			return b.rating - a.rating;
		}
	});
	return sortedProducts;
};

const ProductsPaged = ({ products }) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const sort =
		searchParams.get("sort") !== null ? searchParams.get("sort") : "asc";
	const currentPage =
		searchParams.get("page") !== null ? parseInt(searchParams.get("page")) : 1;

	const search =
		searchParams.get("search") !== null ? searchParams.get("search") : "";

	// const searchedProducts =
	// 	search.length > 0 ? await getSearch(search) : products;

	// console.log(searchedProducts);
	const productsPerPage = 12;
	const pagedProducts = PagedProducts(
		SortProducts(products, sort),
		productsPerPage
	);

	// const numOfPages = Math.ceil(products.length / productsPerPage);
	return (
		<section className='p-4 px-8 bg-green-gradient'>
			{currentPage > pagedProducts.length ? (
				<p>no products</p>
			) : (
				<>
					<div className='flex flex-wrap gap-6'>
						{pagedProducts[currentPage - 1].map((product, index) => {
							return (
								<div
									key={`${index}-${product.product_name}`}
									className='min-w-48 max-w-64 flex-1'
								>
									<ProductCard product={product} index={index} className={""} />
								</div>
							);
						})}
					</div>

					<Pagination className='my-4'>
						<PaginationContent>
							{pagedProducts.map((page, index) => {
								return (
									<PaginationItem key={index}>
										<PaginationLink
											href={{
												pathname: pathname,
												query: { page: `${index + 1}` },
											}}
											isActive={index === currentPage - 1}
										>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								);
							})}
						</PaginationContent>
					</Pagination>
				</>
			)}
		</section>
	);
};

export default ProductsPaged;
