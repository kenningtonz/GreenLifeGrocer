"use client";
import { InputWithLabel } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/lib/classes/user";
import Link from "next/link";
import { useState } from "react";

import { fetchData } from "@/lib/db";
import { password_validation } from "@/lib/utils/inputValidations";
import { useForm, FormProvider } from "react-hook-form";

const ResetPassword = () => {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const code = searchParams.get("code");
	const [errorCode, setErrorCode] = useState(0);
	const methods = useForm();
	const [isReset, setIsReset] = useState(false);

	const [error, setError] = useState("");
	const onSubmit = methods.handleSubmit(async (data) => {
		if (data.password !== data.confirm_password) {
			setError("Passwords do not match");
		} else {
			setError("");
			const resetData = await fetchData(resetPassword, id, code, data.password);
			if (typeof resetData === "string") {
				setError(resetData);
			} else {
				setIsReset(true);
			}
		}
	});
	return (
		<main className=' px-4 py-16 mainGreenCenter'>
			<section className='max-w-md w-full card '>
				<h1 className='text-2xl font-bold text-green-900 mb-4 text-center'>
					Reset Password
				</h1>
				<FormProvider {...methods}>
					<form
						autoComplete='off'
						onSubmit={(e) => e.preventDefault()}
						className='flex flex-col'
						noValidate
					>
						<InputWithLabel
							validation={password_validation}
							label='Password'
							id='password'
							type='password'
							isRequired={true}
						/>
						<InputWithLabel
							validation={password_validation}
							label='Confirm Password'
							id='confirm_password'
							type='password'
							isRequired={true}
						/>
						{isReset ? (
							<>
								<p className='text-green-900 text-center'>
									Password has been reset. Please login.
								</p>
								<Link
									href='/login'
									className='text-xl text-green-500 mb-2 hover:underline text-center self-center'
								>
									Login
								</Link>
							</>
						) : (
							<Button
								className='shadow w-full my-2'
								press={"pressed"}
								variant='greenDark'
								type='submit'
								onClick={onSubmit}
							>
								Reset Password
							</Button>
						)}

						<p className='text-sm text-red-800 text-center'>{error}</p>
						{errorCode == 300 ? (
							<Link
								href='/forgotpassword'
								className='text-sm text-green-500 mb-2 hover:underline text-center self-center'
							>
								Back to Forgot Password
							</Link>
						) : null}
					</form>
				</FormProvider>
			</section>
		</main>
	);
};

export default ResetPassword;
