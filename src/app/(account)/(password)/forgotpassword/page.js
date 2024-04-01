"use client";
import { InputWithLabel } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendResetPasswordEmail } from "@/lib/classes/user";
import Link from "next/link";
import { useState } from "react";
import { email_validation } from "@/lib/utils/inputValidations";
import { useForm, FormProvider } from "react-hook-form";

import { fetchData } from "@/lib/db";

const ForgotPassword = () => {
	const [error, setError] = useState("");
	const [clicked, setClicked] = useState(false);
	const [emailSent, setEmailSent] = useState(false);
	const methods = useForm();

	const onSubmit = methods.handleSubmit(async (data) => {
		setClicked(true);
		const resetData = await fetchData(sendResetPasswordEmail, data.email);
		if (typeof resetData === "string") {
			setError(resetData);
			setClicked(false);
		} else {
			setEmailSent(true);
		}
	});
	return (
		<main className='mainGreenCenter px-4 py-16 flex'>
			<section className='max-w-md w-full card '>
				<h1 className='text-2xl font-bold text-green-900 mb-4 text-center'>
					Reset Password
				</h1>
				{emailSent ? (
					<p className='text-green-900'>
						An email has been sent with instructions to reset your password.
					</p>
				) : (
					<FormProvider {...methods}>
						<form
							autoComplete='off'
							onSubmit={(e) => e.preventDefault()}
							className='flex flex-col'
							noValidate
						>
							<InputWithLabel
								validation={email_validation}
								label='Email'
								id='email'
								isRequired={true}
								type='text'
								placeholder='Email'
							/>

							<p className='text-sm text-red-800 text-center'>{error}</p>
							<Button
								className='shadow w-full my-2'
								press={"pressed"}
								variant='greenDark'
								type='submit'
								disabled={clicked}
								onClick={onSubmit}
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
					</FormProvider>
				)}
			</section>
		</main>
	);
};

export default ForgotPassword;
