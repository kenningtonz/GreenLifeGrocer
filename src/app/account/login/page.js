"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAccount } from "@/lib/classes/user";
import Link from "next/link";

const Login = () => {
	function handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		console.log(email, password);
		// loginAccount(email, password);
	}
	return (
		<main className='bg-olive-100 p-8'>
			<section className=' rounded-lg bg-white shadow-sm p-4 '>
				<h1 className=''>Login</h1>
				<form onSubmit={handleSubmit} className='gap-4 flex flex-col'>
					<Input type='email' id='email' placeholder='Email' />
					<Input type='password' id='password' placeholder='Password' />
					<Button variant='green' type='submit'>
						Login
					</Button>
				</form>
			</section>
			<Link href='/account/create'>Create Account</Link>
		</main>
	);
};

export default Login;
