"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { InputWithIconButton } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { getSearchHints } from "@/lib/classes/search";
import useClickOutside from "@/lib/utils/clickOutside";
import { fetchData } from "@/lib/db";

const SearchBar = ({ className }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchHints, setSearchHints] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const searchResults = useRef();
	const close = useCallback(() => setSearchOpen(false), []);
	useClickOutside(searchResults, close);

	const createQueryString = useCallback(
		(name, value) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);
			return params.toString();
		},
		[searchParams]
	);

	async function handleChanges() {
		if (searchValue.length < 3) {
			setSearchOpen(false);
			setSearchHints([]);
		} else {
			const searchHintsData = await fetchData(getSearchHints, searchValue);
			console.log(searchHintsData);
			if (typeof searchHintsData === "string") {
				setSearchOpen(false);
				// setSearchHints(searchHintsData);
			} else {
				setSearchOpen(true);
				setSearchHints(searchHintsData.products);
			}
		}
	}

	function handleSearch(e) {
		e.preventDefault();
		const form = e.target;
		const search = form.search.value;

		router.push("/grocery" + "?" + createQueryString("search", search));
		resetSearch();
	}

	const resetSearch = () => {
		setSearchOpen(false);
		setSearchHints([]);
		setSearchValue("");
	};

	return (
		<>
			<div
				className={`${className} relative w-full max-w-64 `}
				ref={searchResults}
			>
				<InputWithIconButton
					type='text'
					onClick={() => {
						if (searchHints.length > 0) setSearchOpen(true);
					}}
					onChange={(e) => {
						e.preventDefault();
						setSearchValue(e.target.value);
						handleChanges(e);
					}}
					onSubmit={(e) => {
						// setSearchValue(e.target);
						console.log(e.target);
						handleSearch(e);
					}}
					placeholder='Search..'
					name='search'
					value={searchValue}
					id='search'
					className='max-w-64 '
					icon={<Search className='h-6 w-6' />}
				/>
				{searchOpen ? (
					<div className='absolute top-8 left-0 w-full bg-pink min-h-[120px] p-2 pt-4 rounded-b-lg z-40'>
						<ul>
							{searchHints.length === 0
								? null
								: searchHints.map((product) => {
										return (
											<li
												key={product.product_name}
												className='p-2 hover:bg-pink-200 text-pink-950 rounded-lg cursor-pointer'
												onClick={() => {
													resetSearch();
													router.push(
														`/grocery/${product.category_url}/${product.family_url}/${product.url}`
													);
												}}
											>
												{product.product_name}
											</li>
										);
								  })}
						</ul>
					</div>
				) : null}
			</div>
		</>
	);
};

export default SearchBar;
