"use client";

import { InputWithLabel } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAccount } from "@/lib/classes/user";
import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import ChooseCart from "@/components/chooseCart";
import { useUserContext } from "@/lib/context/user";
import { useCartContext } from "@/lib/context/cart";
import Loader from "@/components/loader";
import {
	email_validation,
	password_validation,
} from "@/lib/utils/inputValidations";
import { fetchData } from "@/lib/db";
import { useForm, FormProvider } from "react-hook-form";

const Login = () => {
	const router = useRouter();
	const [isMounted, setIsMounted] = useState(false);
	const searchParams = useSearchParams();
	const fromPage = searchParams.get("from");
	const methods = useForm();

	useEffect(() => {
		if (Object.keys(user).length > 0) {
			console.log("user is logged in");
			router.push("/account");
		}
		setIsMounted(true);
	}, []);
	const [error, setError] = useState("");
	const [user, setUser] = useUserContext();
	const [cart, setCart] = useCartContext();
	const [chooseCartActive, setChooseCartActive] = useState(false);

	const setCookie = async (session) => {
		console.log("setting cookie", session);
		Cookies.set("session", session, {
			maxAge: 60 * 60 * 24 * 7,
			path: "/",
			httpOnly: false,
		});
	};

	const onSubmit = methods.handleSubmit(async (data) => {
		const loginData = await fetchData(loginAccount, data.email, data.password);
		if (typeof loginData === "string") {
			setError(loginData);
		} else {
			setUser(loginData.user);
			setCookie(loginData.session);
			if (loginData.user.cart != "" && Object.keys(cart).length > 0) {
				setChooseCartActive(true);
			} else {
				if (loginData.user.cart != "") {
					setCart(JSON.parse(loginData.user.cart));
				}
				router.push(fromPage == "checkout" ? "/cart/checkout" : "/account");
			}
		}
	});

	if (!isMounted) {
		return <Loader />;
	}
	return (
		<main className='mainGreenCenter'>
			<section className='max-w-md w-full card'>
				<h1 className='text-center  text-2xl font-bold text-green-900 mb-4'>
					Login
				</h1>
				<FormProvider {...methods}>
					<form
						autoComplete='off'
						onSubmit={(e) => e.preventDefault()}
						className='flex flex-col'
						noValidate
					>
						<InputWithLabel
							validation={email_validation}
							label='Email'
							id='email'
							type='text'
							placeholder='Email'
						/>

						<InputWithLabel
							validation={password_validation}
							label='Password'
							id='password'
							type='text'
							placeholder='Password'
						/>
						<Link
							href='/forgotpassword'
							className='ml-1 text-sm text-green-500 mb-2 hover:underline'
						>
							Forgot password?
						</Link>
						<p className='text-sm text-red-800 text-center'>{error}</p>
						<Button
							className='shadow w-full my-2'
							press={"pressed"}
							variant='greenDark'
							type='submit'
							onClick={onSubmit}
						>
							Login
						</Button>
						<p className='text-green-900 text-center mt-2'>
							Dont have an account?{" "}
							<Link
								href={{
									pathname: "/create",
									query: { from: fromPage == undefined ? "login" : fromPage },
								}}
								className='ml-1 text-sm text-green-500  hover:underline'
							>
								Create Account
							</Link>
						</p>
					</form>
				</FormProvider>
			</section>
			<ChooseCart open={chooseCartActive} setOpen={setChooseCartActive} />
		</main>
	);
};

export default Login;
