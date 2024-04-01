"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const SortSelect = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name, value) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);
			return params.toString();
		},
		[searchParams]
	);

	return (
		<Select
			className='min-w-[180px] max-w-[300px] w-full'
			onValueChange={(value) =>
				router.push(pathname + "?" + createQueryString("sort", value))
			}
		>
			<SelectTrigger className='min-w-[180px] max-w-[300px] w-full'>
				<SelectValue placeholder='Sort By' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='priceLtoH'>Price low to high</SelectItem>
				<SelectItem value='priceHtoL'>Price high to low</SelectItem>
				<SelectItem value='asc'>A to Z</SelectItem>
				<SelectItem value='desc'>Z to A</SelectItem>
				<SelectItem value='rating'>Rating</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default SortSelect;
