"use client";
import { InputWithLabel } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createAccount } from "@/lib/classes/user";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserContext } from "@/lib/context/user";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";

import Loader from "@/components/loader";

import { fetchData } from "@/lib/db";
import {
	name_validation,
	email_validation,
	password_validation,
} from "@/lib/utils/inputValidations";

import { useForm, FormProvider } from "react-hook-form";

const CreateAccount = () => {
	const methods = useForm({ mode: "onBlur" });

	const [user, setUser] = useUserContext();
	const [error, setError] = useState("");
	const [isMounted, setIsMounted] = useState(false);
	const [clicked, setClicked] = useState(false);

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
	};

	const onSubmit = methods.handleSubmit(async (data) => {
		console.log(data);
		setClicked(true);
		const createData = await fetchData(
			createAccount,
			data.email,
			data.password,
			data.name_last,
			data.name_first
		);
		if (typeof createData === "string") {
			setError(createData);
			setClicked(false);
		} else {
			setUser(createData.user);
			setCookie(createData.session);
			methods.reset();
			router.push(fromPage == "cart" ? "/cart/checkout" : "/account");
		}
	});

	if (!isMounted) {
		return <Loader />;
	}
	return (
		<main className='mainGreenCenter px-4 py-16 '>
			<section className='max-w-md w-full card'>
				<h1 className='text-center text-2xl font-bold text-green-900 mb-4'>
					Create Account
				</h1>
				<FormProvider {...methods}>
					<form
						autoComplete='off'
						onSubmit={(e) => e.preventDefault()}
						className='flex flex-col'
						noValidate
					>
						<InputWithLabel
							validation={name_validation}
							label='First Name'
							id='name_first'
							type='text'
							isRequired={true}
							placeholder='First Name'
						/>

						<InputWithLabel
							validation={name_validation}
							label='Last Name'
							id='name_last'
							type='text'
							isRequired={true}
							placeholder='Last Name'
						/>
						<InputWithLabel
							validation={email_validation}
							label='Email'
							id='email'
							isRequired={true}
							type='text'
							placeholder='Email'
						/>

						<InputWithLabel
							validation={password_validation}
							label='Password'
							id='password'
							type='text'
							isRequired={true}
							placeholder='Password'
						/>

						<p className='text-sm text-red-800 text-center'>{error}</p>
						<Button
							className='shadow w-full my-2'
							press={"pressed"}
							variant='greenDark'
							disabled={clicked}
							type='submit'
							onClick={onSubmit}
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
				</FormProvider>
			</section>
		</main>
	);
};

export default CreateAccount;
