import GroceryPage from "@/components/groceryPage";

const Page = ({ params }) => {
	return (
		<GroceryPage departmentURL={params.department} subDepartmentURL={null} />
	);
};

export default Page;
