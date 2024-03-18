import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				"flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = "Input";

const InputWithIconButton = React.forwardRef(
	({ className, type, icon, onSubmit, ...props }, ref) => {
		return (
			<form
				onSubmit={onSubmit}
				className={cn(
					"flex w-full join max-w-sm items-center shadow-md shadow-pink-500/50 rounded-md focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2",
					className
				)}
			>
				<input
					type={type}
					className='flex h-10 w-full rounded-md join-item bg-pink-200  px-3 py-2 text-sm  placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
					ref={ref}
					{...props}
				/>
				<Button type='submit ' className='join-item'>
					{icon}
				</Button>
			</form>
		);
	}
);
InputWithIconButton.displayName = "InputWithIconButton";

export { Input, InputWithIconButton };
