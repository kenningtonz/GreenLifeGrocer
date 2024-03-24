"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAccount } from "@/lib/classes/user";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveLocal } from "@/lib/classes/local";
import { setSession } from "@/lib/classes/session";
import Cookies from "js-cookie";

import { useUserContext } from "@/lib/context/user";

const Login = () => {
	const router = useRouter();
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);
	const [error, setError] = useState("");
	const [user, setUser] = useUserContext();

	const setCookie = async (session) => {
		Cookies.set("session", session, {
			expires: 60 * 60 * 24 * 7,
			path: "/",
			sameSite: "lax",
		});
		// router.refresh();
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
			console.log(user);
			saveLocal(login.user.session);
			setCookie(login.user.session);
			router.push("/account");
		} else {
			setError(login.error.error_message);
			console.log(error);
		}
		//
	}
	if (!isMounted) {
		return null;
	}
	return (
		<main className='bg-olive-100 px-4 py-16 flex justify-center min-h-[90dvh]'>
			<section className='max-w-md rounded-lg bg-white shadow-sm p-4 '>
				<h1 className='text-2xl font-bold text-green-900 mb-4'>Login</h1>
				<form onSubmit={handleSubmit} className='gap-4 flex flex-col'>
					<Input
						className=''
						type='email'
						id='email'
						placeholder='Email'
						// onChange={(e) => setEmail(e.target.value)}
					/>
					<Input type='password' id='password' placeholder='Password' />
					<div className='flex items-center justify-between flex-wrap'>
						<label
							htmlFor='remember-me'
							className='text-sm text-green-900 cursor-pointer'
						>
							<input type='checkbox' id='remember-me' className='mr-2' />
							Remember me
						</label>

						<Link
							href='/account/forgotpassword'
							className='ml-1 text-sm text-green-500  hover:underline'
						>
							Forgot password?
						</Link>
						<p className='text-green-900 mt-4'>
							Dont have an account?
							<Link
								href='/account/create'
								className='ml-1 text-sm text-green-500  hover:underline'
							>
								Create Account
							</Link>
						</p>
					</div>
					<p className='text-sm text-red-800'>{error}</p>
					<Button variant='greenDark' type='submit'>
						Login
					</Button>
				</form>
			</section>
		</main>
	);
};

export default Login;
