"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createAccount } from "@/lib/classes/user";
import Link from "next/link";
import { useState } from "react";

const CreateAccount = () => {
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
		const create = await createAccount(email, password, name_first, name_last);
		console.log(create);
		if (create.error.id === "0") {
			// go to another page
			alert("working");
		} else {
			alert("Something went wrong");
			setError(create.error.message);
			console.log(error);
		}
	}

	return (
		<main className='bg-olive-100 p-8'>
			<section className=' rounded-lg bg-white shadow-sm p-4 '>
				<h1 className=''>Create Account</h1>
				<form onSubmit={handleSubmit} className='gap-4 flex flex-col'>
					<Input type='text' id='name_first' placeholder='First Name' required />
					<Input type='text' id='name_last' placeholder='Last Name' required />
					<Input type='email' id='email' placeholder='Email' required />
					<Input type='password' id='password' placeholder='Password' required />
					<Button variant='green' type='submit'>
						Create Account
					</Button>
					<p>{error}</p>
				</form>
				<Link href='/account/login' className='underline'>
					Login
				</Link>
			</section>
		</main>
	);
};

export default CreateAccount;
