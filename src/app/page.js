import Image from "next/image";
import { getSessionCookie } from "@/lib/classes/cookies";
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
import { getSession } from "@/lib/classes/user";
import Link from "next/link";

export default async function Home() {
	const productsPHP = await getRandomProducts(4);
	const { products, error } = productsPHP;
	console.log(productsPHP);
	// const session = getSessionCookie();
	// console.log(session);
	return (
		<main className='py-8 flex flex-col justify-between items-center'>
			<section className='w-full flex justify-center'>
				<Carousel
					className='w-full max-w-5xl'
					opts={{ loop: true }}
					autoPlay={true}
				>
					<CarouselContent className='-ml-1'>
						<CarouselItem className='py-4 px-2'>
							<Hero image={"hero2.webp"} className={" justify-center items-center"}>
								<div
									className={` max-w-[50%] bg-white/80 rounded-tl-[60px] rounded-br-[60px] p-4 flex flex-col items-center justify-center text-center`}
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
									<p className='mb-2  text-lg text-green'>
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
						<CarouselItem>
							<Hero image={"hero3.webp"} className={"justify-center items-end "}>
								<div className={`max-w-[50%] `}>
									<h2 className='mb-1 text-xl font-bold fontSpecial text-green-900'>
										Nourish Your Body with Healthy Eating Habits
									</h2>
									<p className='mb-2  text-lg text-green'>
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

			<section
				className={` p-4 mt-12 mb-8 w-full bg-olive/50 flex flex-col items-center`}
			>
				<h2 className='text-3xl text-center text-green-900'>Featured Products</h2>
				<div className='mt-2 flex gap-4 sm:flex-nowrap flex-wrap p-4  max-w-5xl'>
					{error.id === "0" ? (
						<>
							{products.map((product) => {
								return (
									<ProductCard
										key={product.upc}
										product={product}
										className='max-w-64'
									/>
								);
							})}
						</>
					) : null}
				</div>
			</section>
			<Suspense fallback={<div>Loading...</div>}>
				<DepartmentsList />
			</Suspense>

			<BentoLayout />
		</main>
	);
}
