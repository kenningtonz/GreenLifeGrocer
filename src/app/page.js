import styles from "./page.module.css";
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
		<main className='py-8'>
			<section className='w-full flex justify-center'>
				<Carousel
					className='w-full max-w-5xl'
					opts={{ loop: true }}
					autoPlay={true}
				>
					<CarouselContent className=''>
						<CarouselItem className='p-8 flex flex-col w-full rounded-lg place-items-center bg-cover bg-center min-h-[300px] bg-[url(/images/hero.png)]'>
							<section className={`max-w-[50%]`}>
								<h1 className='mb-5 text-5xl font-bold fontSpecial text-green-900'>
									GreenLife Grocer
								</h1>
								<h2 className='fontSpecial text-3xl text-green'>
									Nourishing Your Body, Nurturing the Planet
								</h2>
							</section>
						</CarouselItem>
						<CarouselItem className='p-8 flex flex-col w-full rounded-lg items-start justify-center bg-cover bg-center min-h-[300px] bg-[url(/images/home/hero1.webp)]'>
							<section className={`max-w-[50%]`}>
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
							</section>
						</CarouselItem>
						<CarouselItem>
							<Hero
								image='/hero3.jpg'
								content={
									<>
										<h2 className='fontSpecial text-3xl text-green-900'>
											Your Gateway to Sustainable Shopping
										</h2>
										<p className='text-xl'>
											At GreenLife Grocer, we believe in more than just filling your pantry
											– were dedicated to cultivating a greener tomorrow while nourishing
											you today.
										</p>
									</>
								}
							/>
						</CarouselItem>
					</CarouselContent>
					<CarouselDots variant={"default"} className='max-w-5xl' />
				</Carousel>
			</section>

			<section
				className={` p-4 mt-12 mb-8 w-full bg-half-green flex flex-col items-center`}
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
										className='w-64 h-full'
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
