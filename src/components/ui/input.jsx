import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { findInputError } from "@/lib/utils/findInputError";
import { isFormInvalid } from "@/lib/utils/isFormInvalid";
import { Check } from "lucide-react";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				"flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white disabled:placeholder:text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive  disabled:cursor-default disabled:border-none dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = "Input";

const InputCheckbox = React.forwardRef(
	({ label, id, className, ...props }, ref) => {
		const { register } = useFormContext();
		return (
			<div className='flex items-center gap-2 relative'>
				<input
					ref={ref}
					{...register(id)}
					className=' peer  appearance-none h-6 w-6 shrink-0 rounded-lg border border-primary ring-offset-background 
					focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
					disabled:cursor-not-allowed disabled:opacity-50 
					checked:bg-green checked:text-white'
					id={id}
					type='checkbox'
					{...props}
				/>
				<Check className='h-4 w-4 left-1 absolute pointer-events-none hidden peer-checked:block stroke-white stroke-2 outline-none' />
				<label
					className='text-green-900 text-sm font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
					htmlFor={id}
				>
					{label}
				</label>
			</div>
		);
	}
);
InputCheckbox.displayName = "Checkbox";

const InputWithLabel = React.forwardRef(
	({ label, id, className, validation, isRequired, ...props }, ref) => {
		const {
			register,
			formState: { errors },
		} = useFormContext();

		const inputError = findInputError(errors, id);
		const isInvalid = isFormInvalid(inputError);

		return (
			<>
				<label
					className='text-green-900 text-sm font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
					htmlFor={id}
				>
					{label}
				</label>

				<input
					ref={ref}
					{...register(id, {
						...validation,
						required: isRequired
							? {
									value: true,
									message: "Required",
							  }
							: null,
					})}
					className='mb-2 flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white disabled:placeholder:text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive  disabled:cursor-default disabled:border-none '
					id={id}
					{...props}
				/>
				{isInvalid ? (
					<p className='text-red-800 text-sm -mt-2 mb-2 ' role='alert'>
						{inputError.error.message}
					</p>
				) : null}
			</>
		);
	}
);
InputWithLabel.displayName = "InputWithLabel";

const InputWithIconButton = React.forwardRef(
	({ className, type, icon, onSubmit, ...props }, ref) => {
		return (
			<form
				onSubmit={onSubmit}
				className={cn(
					"flex w-full join max-w-sm items-center shadow shadow-pink-500 rounded-md focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2",
					className
				)}
			>
				<input
					type={type}
					className='text-pink-950 flex h-10 w-full rounded-md join-item bg-pink  px-3 py-2 text-sm  placeholder:text-pink-800/80 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
					ref={ref}
					{...props}
				/>
				<button
					type='submit'
					className='join-item bg-pink text-pink-950 h-10 px-4 py-2 rounded-r-lg hover:text-pink-800'
				>
					{icon}
				</button>
			</form>
		);
	}
);
InputWithIconButton.displayName = "InputWithIconButton";

export { Input, InputWithIconButton, InputWithLabel, InputCheckbox };
