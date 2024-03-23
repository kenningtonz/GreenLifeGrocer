import styles from "./page.module.css";
import Image from "next/image";
import { getSessionCookie } from "@/lib/classes/cookies";
import DepartmentsList from "@/components/departmentsList";
import { getRandomProducts } from "@/lib/classes/product";
import ProductCard from "@/components/products/productCard";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Hero from "@/components/hero";
import { Suspense } from "react";
import { getSession } from "@/lib/classes/user";

export default async function Home() {
	const productsPHP = await getRandomProducts(4);
	const { products, error } = productsPHP;
	console.log(productsPHP);
	// const session = getSessionCookie();
	// console.log(session);
	return (
		<main className={styles.main}>
			<section className='w-full '>
				<Carousel className='w-full ' opts={{ loop: true }}>
					<CarouselContent>
						<CarouselItem>
							<Hero
								image='/hero.png'
								content={
									<>
										<h1 className='mb-5 text-5xl font-bold fontSpecial text-green-900'>
											GreenLife Grocer
										</h1>
										<h2 className='fontSpecial text-3xl text-green'>
											Nourishing Your Body, Nurturing the Planet
										</h2>
									</>
								}
							/>
						</CarouselItem>
						<CarouselItem>
							<Hero
								image='/hero2.jpg'
								content={
									<>
										<Image
											className='text-center h-auto'
											src='/images/logo.png'
											alt='logo'
											width={173}
											height={208}
										/>
										<Button className='shadow-md'> Shop all Products</Button>
									</>
								}
							/>
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
					<CarouselPrevious variant='green' />
					<CarouselNext variant='green' />
				</Carousel>
			</section>

			<section className={`mt-12 mb-8 w-full `}>
				<h2 className='text-3xl text-center text-green-900'>Featured Products</h2>
				<div className='mt-2 flex gap-4 sm:flex-nowrap flex-wrap p-4 justify-evenly bg-half-green'>
					{error.id === "0" ? (
						<>
							{products.map((product) => {
								return (
									<ProductCard key={product.upc} product={product} className='w-64' />
								);
							})}
						</>
					) : (
						<p className='text-center'>Sorry, we could not find the products</p>
					)}
				</div>
			</section>

			<Suspense fallback={<div>Loading...</div>}>
				<DepartmentsList />
			</Suspense>
		</main>
	);
}
