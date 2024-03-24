"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { InputWithIconButton } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCallback } from "react";
import { getSearchHints } from "@/lib/classes/search";

const SearchBar = () => {
	const router = useRouter();
	function handleSearch(e) {
		e.preventDefault();
		const form = e.target;
		const search = form.search.value;

		router.push(pathname + "?" + createQueryString("search", search));
		console.log(search);
	}

	return (
		<InputWithIconButton
			type='text'
			onSubmit={handleSearch}
			placeholder='Search..'
			name='search'
			id='search'
			className=''
			icon={<Search className='h-6 w-6' />}
		/>
	);
};

export default SearchBar;
