"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendResetPasswordEmail } from "@/lib/classes/user";
import Link from "next/link";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const ForgotPassword = () => {
	const [error, setError] = useState("");
	const [clicked, setClicked] = useState(false);
	const [emailSent, setEmailSent] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		setClicked(true);
		const reset = await sendResetPasswordEmail(email);
		console.log(reset);
		if (reset.error.id == "0") {
			// go to another page
			setEmailSent(true);
		} else {
			setError(reset.error.error_message);
			setClicked(false);
			console.log(error);
		}
		//
	}
	return (
		<main className='mainGreenCenter px-4 py-16 flex'>
			<section className='max-w-md w-full rounded-lg bg-white shadow shadow-olive-500 p-4 '>
				<h1 className='text-2xl font-bold text-green-900 mb-4 text-center'>
					Reset Password
				</h1>
				{emailSent ? (
					<p className='text-green-900'>
						An email has been sent with instructions to reset your password.
					</p>
				) : (
					<form onSubmit={handleSubmit} className='flex flex-col'>
						<Label htmlFor='email'>Email</Label>
						<Input
							className='mb-4'
							type='email'
							id='email'
							placeholder='Email'
							required
						/>

						<p className='text-sm text-red-800 text-center'>{error}</p>
						<Button
							className='shadow w-full my-2'
							press={"pressed"}
							variant='greenDark'
							type='submit'
							disabled={clicked}
						>
							Send Reset Password Email
						</Button>
						<Link
							href='/login'
							className='text-sm text-green-500 mb-2 hover:underline  text-center self-center'
						>
							Back to Login
						</Link>
					</form>
				)}
			</section>
		</main>
	);
};

export default ForgotPassword;
