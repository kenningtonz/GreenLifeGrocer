"use client";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/lib/classes/user";
import Link from "next/link";
import { useState } from "react";

const ResetPassword = () => {
	const [searchParams] = useSearchParams();
	const code = searchParams.get("code");
	const id = searchParams.get("id");

	const [error, setError] = useState("");
	async function handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const password = form.password.value;
		const confirm_password = form.confirm_password.value;
		if (password !== confirm_password) {
			setError("Passwords do not match");
		} else {
			setError("");
			const reset = await resetPassword(id, code, password);
			console.log(reset);
			if (reset.error.id === "0") {
				// go to another page
				alert("working");
			} else {
				setError(reset.error.error_message);
				console.log(error);
			}
		}
	}
	return (
		<main className='bg-olive-100 px-4 py-16 flex justify-center'>
			<section className='max-w-md rounded-lg bg-white shadow-sm p-4 '>
				<h1 className='text-2xl font-bold text-green-900 mb-4'>Reset Password</h1>
				<form onSubmit={handleSubmit} className='gap-4 flex flex-col'>
					<Input className='' type='password' id='password' placeholder='Password' />
					<Input
						className=''
						type='password'
						id='confirm_password'
						placeholder='Confirm Password'
					/>

					<p className='text-sm text-red-800'>{error}</p>
					<Button variant='greenDark' type='submit'>
						Reset Password
					</Button>
				</form>
			</section>
		</main>
	);
};

export default ResetPassword;
