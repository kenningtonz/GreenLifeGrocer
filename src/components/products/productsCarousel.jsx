import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import ProductCard from "@/components/products/productCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

const ProductsCarousel = ({ products }) => {
	return (
		<section className='w-full flex justify-center px-8'>
			<Carousel
				className='w-full  flex items-center sm:max-w-[80dvw]  max-w-60  '
				opts={{ loop: true, align: "start" }}
			>
				<CarouselPrevious variant='green' />
				<CarouselContent className='-ml-1'>
					{products.map((product, index) => {
						return (
							<CarouselItem
								key={`${product.upc}-${index}`}
								className=' pl-4 md:basis-1/3 lg:basis-1/4 sm:basis-1/2 basis-full '
							>
								<div className=' py-4 px-2 h-full'>
									<ProductCard
										product={product}
										index={index}
										className={" min-w-36 max-w-64 h-full"}
									/>
								</div>
							</CarouselItem>
						);
					})}
				</CarouselContent>

				<CarouselNext variant='green' />
			</Carousel>
		</section>
	);
};

export default ProductsCarousel;
