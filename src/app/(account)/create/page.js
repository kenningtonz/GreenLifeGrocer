"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createAccount, loginAccount } from "@/lib/classes/user";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserContext } from "@/lib/context/user";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/loader";
import { Label } from "@/components/ui/label";

const CreateAccount = () => {
	const [user, setUser] = useUserContext();
	const [error, setError] = useState("");
	const [isMounted, setIsMounted] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();
	const fromPage = searchParams.get("from");

	useEffect(() => {
		if (Object.keys(user).length > 0) {
			console.log("user is logged in");
			router.push("/account");
		}
		setIsMounted(true);
	}, []);

	const setCookie = async (session) => {
		Cookies.set("session", session, {
			expires: 60 * 60 * 24 * 7,
			path: "/",
			httpOnly: true,
		});
		// router.refresh();
	};

	async function handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		const name_first = form.name_first.value;
		const name_last = form.name_last.value;
		console.log(email, password, name_first, name_last);
		const create = await createAccount(email, password, name_first, name_last);

		console.log(create);
		if (create.error.id === "0") {
			console.log("create good");

			// go to another page
			const login = await loginAccount(email, password);
			console.log(login);
			if (login.error.id === "0") {
				setUser(login.user);
				setCookie(login.user.session);
				router.push(fromPage == "cart" ? "/cart/checkout" : "/account");
			}
		} else {
			setError(create.error.error_message);
			console.log(error);
		}
	}

	if (!isMounted) {
		return <Loader />;
	}

	return (
		<main className='mainGreenCenter px-4 py-16 '>
			<section className='max-w-md w-full rounded-lg bg-white shadow shadow-olive-500 p-4 '>
				<h1 className='text-center text-2xl font-bold text-green-900 mb-4'>
					Create Account
				</h1>
				<form onSubmit={handleSubmit} className='flex flex-col'>
					<Label htmlFor='name_first'>First Name</Label>
					<Input
						className='mb-2'
						type='text'
						id='name_first'
						placeholder='First Name'
						required
					/>
					<Label htmlFor='name_last'>Last Name</Label>
					<Input
						className='mb-2'
						type='text'
						id='name_last'
						placeholder='Last Name'
						required
					/>
					<Label htmlFor='email'>Email</Label>
					<Input
						className='mb-2'
						type='email'
						id='email'
						placeholder='Email'
						required
					/>
					<Label htmlFor='password'>Password</Label>
					<Input
						className='mb-2'
						type='password'
						id='password'
						placeholder='Password'
						required
					/>
					<p className='text-sm text-red-800 text-center'>{error}</p>
					<Button
						className='shadow w-full my-2'
						press={"pressed"}
						variant='greenDark'
						type='submit'
					>
						Create Account
					</Button>

					<p className='text-green-900 text-center mt-2 self-center'>
						Have an account?
						<Link
							href='/login'
							className='ml-1 text-sm text-green-500  hover:underline '
						>
							Login
						</Link>
					</p>
				</form>
			</section>
		</main>
	);
};

export default CreateAccount;
