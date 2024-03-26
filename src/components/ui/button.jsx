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
					"shadow-pink-500  bg-pink text-pink-900  hover:bg-pink/80  data-[active=true]:bg-pink-700 data-[active=true]:text-white",

				green:
					"bg-olive/80 text-green-900 hover:bg-olive/90 data-[active=true]:bg-green data-[active=true]:text-white",
				outline:
					"border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
				greenDark:
					"shadow-green-800 bg-green-900 text-green-100 hover:bg-green-900/90 ",
				ghost:
					"hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
				link:
					"text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
				ghostWhite: " text-white hover:bg-white/20 hover:text-green-200 ",
			},
			rounded: {
				default: "rounded-md",
				full: "rounded-full",
				none: "",
			},
			press: {
				default: "",
				pressed: "active:translate-y-[2px] active:shadow-none",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
				smallIcon: "h-4 w-4",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			rounded: "default",
			press: "default",
		},
	}
);

const Button = React.forwardRef(
	(
		{ className, variant, size, rounded, press, asChild = false, ...props },
		ref
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className, rounded, press }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

const ButtonIcon = React.forwardRef(
	({ className, size = 32, icon = "add", ...props }, ref) => {
		return (
			<button
				title={icon}
				aria-label={icon}
				className={`${className} cursor-pointer outline-none w-min h-min `}
				ref={ref}
				{...props}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width={size}
					height={size}
					viewBox='0 0 24 24'
					className='hover:rotate-90  stroke-pink-400 fill-none hover:fill-pink-800 group-active:stroke-purple-200 active:fill-pink-600 active:duration-0 duration-300'
				>
					<path
						d='M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z'
						strokeWidth='1.5'
					></path>
					{icon === "add" ? (
						<>
							<path d='M12 8V16' strokeWidth='1.5'></path>
							<path d='M8 12H16' strokeWidth='1.5'></path>
						</>
					) : icon === "remove" ? (
						<>
							<path d='M 14.8 9.2 L 9.2 14.8' strokeWidth='1.5'></path>
							<path d='M 9.2 9.2 L 14.8 14.8' strokeWidth='1.5'></path>
						</>
					) : null}
				</svg>
			</button>
		);
	}
);
ButtonIcon.displayName = "ButtonIcon";

export { Button, buttonVariants, ButtonIcon };
