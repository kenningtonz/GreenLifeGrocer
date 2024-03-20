import GroceryPage from "@/components/groceryPage";

const Page = ({ params }) => {
	const departmentURL = params.department;
	const subDepartmentURL = params.sub;
	return (
		<GroceryPage
			departmentURL={departmentURL}
			subDepartmentURL={subDepartmentURL}
		/>
	);
};

export default Page;
