import Image from "next/image";
import DepartmentsList from "@/components/departmentsList";
import { getRandomProducts } from "@/lib/classes/product";
import ProductCard from "@/components/products/productCard";
import { Button } from "@/components/ui/button";
import BentoLayout from "@/components/bento";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselDots,
} from "@/components/ui/carousel";
import Hero from "@/components/hero";
import { Suspense } from "react";
import Link from "next/link";
import Loading from "@/components/loader";
import { fetchData } from "@/lib/db";

export default async function Home() {
	const productsData = await fetchData(getRandomProducts, 4);

	return (
		<main className='py-8 flex flex-col justify-between items-center'>
			<section className='w-full flex justify-center mb-4'>
				<Carousel
					className='w-full max-w-5xl'
					opts={{ loop: true }}
					autoPlay={true}
				>
					<CarouselContent className='-ml-1'>
						<CarouselItem className='py-4 px-2'>
							<Hero image={"hero2.webp"} className={" justify-center items-center"}>
								<div
									className={` sm:max-w-[50%] bg-white/80 rounded-tl-[60px] rounded-br-[60px] p-4 flex flex-col items-center justify-center text-center`}
								>
									<Image
										src='/images/logo.png'
										alt='GreenLife Grocer Logo'
										width={100}
										height={100}
									/>
									<h1 className='mb-3 text-4xl font-bold fontSpecial text-green-900'>
										GreenLife Grocer
									</h1>
									<h2 className='fontSpecial text-3xl text-green'>
										Nourishing Your Body, Nurturing the Planet
									</h2>
								</div>
							</Hero>
						</CarouselItem>
						<CarouselItem className='py-4 px-2'>
							<Hero image={"hero1.webp"} className={"justify-center"}>
								<div className={`max-w-[50%]`}>
									<h2 className='mb-1 text-xl font-bold fontSpecial text-green-900'>
										Discover the Bounty of Nature with Fresh Fruits
									</h2>
									<p className='mb-2  text-lg text-green sm:block hidden'>
										Indulge in the natural sweetness and vibrant colors of our
										hand-selected fruit collection. From juicy strawberries to exotic
										mangoes, our fruits are bursting with flavor and packed with essential
										vitamins and nutrients.
									</p>
									<Link href='/grocery/produce/fruits'>
										<Button
											variant='default'
											press='pressed'
											className='shadow min-w-[50%] '
										>
											Shop Fruits
										</Button>
									</Link>
								</div>
							</Hero>
						</CarouselItem>
						<CarouselItem className='py-4 px-2'>
							<Hero image={"hero3.webp"} className={"justify-center items-end "}>
								<div className={`max-w-[50%] `}>
									<h2 className='mb-1 text-xl font-bold fontSpecial text-green-900'>
										Nourish Your Body with Healthy Eating Habits
									</h2>
									<p className='mb-2  text-lg text-green  sm:block hidden'>
										Healthy eating isn&apos;t just about what you eat; it&apos;s a
										lifestyle that nurtures your body and mind. At our store, we&apos;re
										committed to empowering you with the tools and knowledge to make
										nutritious choices every day.
									</p>
								</div>
							</Hero>
						</CarouselItem>
					</CarouselContent>
					<CarouselDots variant={"default"} className='max-w-5xl' />
				</Carousel>
			</section>

			{typeof productsData === "string" ? (
				<p>{productsData}</p>
			) : (
				<section
					className={` p-4 mt-12 mb-8 w-full bg-olive/50 flex flex-col items-center`}
				>
					<h2 className='text-3xl text-center text-green-900'>Featured Products</h2>
					<div className='mt-2 flex gap-4 sm:flex-nowrap flex-wrap p-4 justify-center max-w-5xl'>
						{productsData.products.map((product) => {
							return (
								<ProductCard key={product.upc} product={product} className='max-w-64' />
							);
						})}
					</div>
				</section>
			)}
			<Suspense fallback={<Loading />}>
				<DepartmentsList />
			</Suspense>

			<BentoLayout />
		</main>
	);
}
