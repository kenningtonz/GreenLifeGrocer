"use client";
import DepartmentsList from "@/components/departmentsList";
import { useSearchParams, usePathname } from "next/navigation";
import SearchResults from "@/components/searchResults";

const Grocery = () => {
	const searchParams = useSearchParams();
	const search =
		searchParams.get("search") !== null ? searchParams.get("search") : "";

	if (search != "") {
		return <SearchResults search={search} />;
	}
	return (
		<main className='mainGreenCenter'>
			<DepartmentsList />
		</main>
	);
};

export default Grocery;
