"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendResetPasswordEmail } from "@/lib/classes/user";
import Link from "next/link";
import { useState } from "react";

const ForgotPassword = () => {
	const [error, setError] = useState("");
	const [emailSent, setEmailSent] = useState(false);
	async function handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;

		const reset = await sendResetPasswordEmail(email);
		console.log(reset);
		if (reset.error.id === "0") {
			// go to another page
			setEmailSent(true);
		} else {
			setError(reset.error.error_message);
			console.log(error);
		}
		//
	}
	return (
		<main className='bg-olive-100 px-4 py-16 flex justify-center'>
			<section className='max-w-md w-full rounded-lg bg-white shadow-sm p-4 '>
				<h1 className='text-2xl font-bold text-green-900 mb-4'>Reset Password</h1>
				{emailSent ? (
					<p className='text-green-900'>
						An email has been sent with instructions to reset your password.
					</p>
				) : (
					<form onSubmit={handleSubmit} className='gap-4 flex flex-col'>
						<Input className='' type='email' id='email' placeholder='Email' />

						<p className='text-sm text-red-800'>{error}</p>
						<Button variant='greenDark' type='submit'>
							Send Reset Password Email
						</Button>
					</form>
				)}
			</section>
		</main>
	);
};

export default ForgotPassword;
