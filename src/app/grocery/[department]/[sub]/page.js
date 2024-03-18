import Departments from "@/components/departmentsPage";

const Page = ({ params }) => {
	const departmentURL = params.department;
	const subDepartmentURL = params.sub;
	return (
		<Departments
			departmentURL={departmentURL}
			subDepartmentURL={subDepartmentURL}
		/>
	);
};

export default Page;
