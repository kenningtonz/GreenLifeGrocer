"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAccount } from "@/lib/classes/user";
import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import ChooseCart from "@/components/chooseCart";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useUserContext } from "@/lib/context/user";
import { useCartContext } from "@/lib/context/cart";
import Loader from "@/components/loader";
import { Label } from "@/components/ui/label";

const Login = () => {
	const router = useRouter();
	const [isMounted, setIsMounted] = useState(false);
	const searchParams = useSearchParams();
	const fromPage = searchParams.get("from");

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
		Cookies.set("session", session, {
			expires: 60 * 60 * 24 * 7,
			path: "/",
			httpOnly: true,
		});
	};

	async function handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		console.log(email, password);
		const login = await loginAccount(email, password);
		console.log(login);
		if (login.error.id === "0") {
			setUser(login.user);
			setCookie(login.user.session);
			if (login.user.cart != "" && Object.keys(cart).length > 0) {
				setChooseCartActive(true);
			} else {
				if (login.user.cart != "") {
					setCart(JSON.parse(login.user.cart));
				}
				router.push(fromPage == "cart" ? "/cart/checkout" : "/account");
			}
		} else {
			setError(login.error.error_message);
			console.log(error);
		}
		//
	}
	if (!isMounted) {
		return <Loader />;
	}
	return (
		<main className='mainGreenCenter'>
			<section className='max-w-md w-full rounded-lg bg-white shadow shadow-olive-500 p-4 '>
				<h1 className='text-center  text-2xl font-bold text-green-900 mb-4'>
					Login
				</h1>
				<form onSubmit={handleSubmit} className='flex flex-col'>
					<Label htmlFor='email'>Email</Label>
					<Input
						className='mb-4'
						type='email'
						id='email'
						placeholder='Email'
						required
					/>
					<Label htmlFor='password'>Password</Label>
					<Input
						type='password'
						className='mb-2'
						id='password'
						placeholder='Password'
						required
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
			</section>
			<ChooseCart open={chooseCartActive} setOpen={setChooseCartActive} />
		</main>
	);
};

export default Login;
