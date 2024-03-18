import styles from "./page.module.css";

import Departments from "@/components/departments";
import Image from "next/image";
import ProductCard from "@/components/productCard";
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

export default function Home() {
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
											className='text-center'
											src='/images/logo.png'
											alt='logo'
											width={173}
											height={208}
											fill={false}
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
											– we're dedicated to cultivating a greener tomorrow while nourishing
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
				<div className='mt-2 flex gap-4 flex-wrap p-4 justify-evenly bg-half-green'>
					{/* <ProductCard
						upc='16000329904'
						name='Frosting, Butter Cream'
						cost='2.99'
						brand='Betty Crocker'
					/>
					<ProductCard
						upc='34000146000'
						name='Milk Chocolate Chips'
						cost='3.59'
						brand="Hershey's"
					/>
					<ProductCard
						upc='43000253403'
						name='Baking Chocolate Squares, Semi-Sweet'
						cost='2.59'
						brand="Baker's"
					/>
					<ProductCard
						upc='16000409897'
						name='Cake Mix, Chocolate Fudge'
						cost='3.49'
						brand='Betty Crocker'
					/> */}
				</div>
			</section>

			<Suspense fallback={<div>Loading...</div>}>
				<Departments />
			</Suspense>
		</main>
	);
}
