import Departments from "@/components/departmentsPage";

const Page = ({ params }) => {
	return <Departments departmentURL={params.department} subDepartmentURL={null}/>;
};

export default Page;
