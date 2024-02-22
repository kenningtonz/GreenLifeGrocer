import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex  items-center justify-center whitespace-nowrap  text-sm font-medium  transition-colors disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"shadow-md shadow-pink-500 bg-pink-200 text-pink-500  hover:bg-pink-200/90",
				green: "bg-green-30 text-green-500 hover:bg-green-300/90 ",
				outline:
					"border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
				greenDark: "bg-green-500 text-green-100 hover:bg-green-500/90 ",
				ghost:
					"hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
				link:
					"text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
			},
			rounded: {
				default: "rounded-md",
				none: "rounded-none",
			},
			size: {
				default: "h-10 px-1 py-o5",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			rounded: "default",
		},
	}
);

const Button = React.forwardRef(
	({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className, rounded }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
