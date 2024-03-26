"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { InputWithIconButton } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCallback } from "react";
import { getSearchHints } from "@/lib/classes/search";

const SearchBar = () => {
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

	function handleSearch(e) {
		e.preventDefault();
		const form = e.target;
		const search = form.search.value;

		router.push("/grocery" + "?" + createQueryString("search", search));
		console.log(search);
	}

	return (
		<InputWithIconButton
			type='text'
			onSubmit={handleSearch}
			placeholder='Search..'
			name='search'
			id='search'
			className='max-w-64 w-full'
			icon={<Search className='h-6 w-6' />}
		/>
	);
};

export default SearchBar;
