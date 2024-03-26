"use client";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/lib/classes/user";
import Link from "next/link";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { set } from "react-hook-form";

const ResetPassword = () => {
	const searchParams = useSearchParams();
	const code = searchParams.get("code");
	const id = searchParams.get("id");
	const [errorCode, setErrorCode] = useState(0);

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
			setErrorCode(reset.error.id);
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
		<main className=' px-4 py-16 mainGreenCenter'>
			<section className='max-w-md w-full rounded-lg bg-white shadow shadow-olive-500 p-4 '>
				<h1 className='text-2xl font-bold text-green-900 mb-4 text-center'>
					Reset Password
				</h1>
				<form onSubmit={handleSubmit} className='flex-col flex '>
					<Label htmlFor='password'>Password</Label>
					<Input
						className='mb-4'
						type='password'
						id='password'
						required
						placeholder='Password'
					/>
					<Label htmlFor='confirm_password'>Confirm Password</Label>
					<Input
						className='mb-4'
						type='password'
						id='confirm_password'
						required
						placeholder='Confirm Password'
					/>

					<p className='text-sm text-red-800 text-center'>{error}</p>
					{errorCode == 300 ? (
						<Link
							href='/forgotpassword'
							className='text-sm text-green-500 mb-2 hover:underline text-center self-center'
						>
							Back to Forgot Password
						</Link>
					) : null}
					<Button
						className='shadow w-full my-2'
						press={"pressed"}
						variant='greenDark'
						type='submit'
					>
						Reset Password
					</Button>
				</form>
			</section>
		</main>
	);
};

export default ResetPassword;
