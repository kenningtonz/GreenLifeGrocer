"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createAccount } from "@/lib/classes/user";
import Link from "next/link";
import { useState } from "react";
import groceryStore from "@/lib/classes/store";

const CreateAccount = () => {
	const emailStored = groceryStore((state) => state.email);
	const saveEmail = groceryStore((state) => state.setEmail);
	// let error = "";
	const [error, setError] = useState("");
	async function handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		const name_first = form.name_first.value;
		const name_last = form.name_last.value;
		console.log(email, password, name_first, name_last);
		saveEmail(email);
		const create = await createAccount(email, password, name_first, name_last);
		console.log(create);
		if (create.error.id === "0") {
			// go to another page
			alert("working");
		} else {
			setError(create.error.error_message);
			console.log(error);
		}
	}

	return (
		<main className='bg-olive-100 px-4 py-16 flex justify-center'>
			<section className='max-w-md w-full rounded-lg bg-white shadow-sm p-4 '>
				<h1 className='text-2xl font-bold text-green-900 mb-4'>Create Account</h1>
				<form onSubmit={handleSubmit} className='gap-4 flex flex-col'>
					<Input type='text' id='name_first' placeholder='First Name' required />
					<Input type='text' id='name_last' placeholder='Last Name' required />
					<Input type='email' id='email' placeholder='Email' required />
					<Input type='password' id='password' placeholder='Password' required />
					<p className='text-sm text-red-800'>{error}</p>
					<Button variant='green' type='submit'>
						Create Account
					</Button>
					<div className='flex items-center justify-between flex-wrap'>
						<p className='text-green-900 mt-4'>
							Have an account?
							<Link
								href='/account/login'
								className='ml-1 text-sm text-green-500  hover:underline'
							>
								Login
							</Link>
						</p>
					</div>
				</form>
			</section>
		</main>
	);
};

export default CreateAccount;
