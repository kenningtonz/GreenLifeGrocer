import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				"flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white disabled:placeholder:text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-default disabled:border-none dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
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
				<Button type='submit ' className='join-item'>
					{icon}
				</Button>
			</form>
		);
	}
);
InputWithIconButton.displayName = "InputWithIconButton";

export { Input, InputWithIconButton };
