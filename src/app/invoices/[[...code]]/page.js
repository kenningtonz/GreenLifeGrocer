import { fetchData } from "@/lib/db";
import { getInvoice } from "@/lib/classes/user";
import Invoice from "@/components/invoice";
const Invoices = async ({ params }) => {
	const code = params.code[0];
	if (code === undefined) {
		return (
			<main className='mainGreenCenter'>
				<section className='max-w-md w-full card'>
					<p>No Invoice Found</p>
				</section>
			</main>
		);
	}

	const invoiceData = await fetchData(getInvoice, code);

	if (typeof invoiceData === "string") {
		return (
			<main className='mainGreenCenter'>
				<section className='max-w-md w-full card'>
					<p>{invoiceData}</p>
				</section>
			</main>
		);
	}

	return (
		<main className='mainGreen px-4 py-8 '>
			<Invoice invoice={invoiceData.invoice} />
		</main>
	);
};

export default Invoices;
