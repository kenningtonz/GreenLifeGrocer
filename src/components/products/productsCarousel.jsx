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
		<section className='w-[90dvw] '>
			<Carousel
				className=' w-full px-12 py-4  '
				opts={{ loop: true, align: "start" }}
			>
				<CarouselContent className=' '>
					{products.map((product, index) => {
						return (
							<CarouselItem
								key={`${product.upc}-${index}`}
								className=' max-w-48 py-4 px-2'
							>
								<ProductCard
									product={product}
									index={index}
									className={"h-full "}
									small={true}
								/>
							</CarouselItem>
						);
					})}
				</CarouselContent>
				<CarouselPrevious variant='green' />
				<CarouselNext variant='green' />
			</Carousel>
		</section>
	);
};

export default ProductsCarousel;
