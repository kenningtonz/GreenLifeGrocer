import { dateFormatter } from "@/lib/utils/dateFormatter";
import Link from "next/link";

function PurchaseHistory({ invoiceData }) {
	if (typeof invoiceData === "string") {
		return (
			<section className=' flex flex-col items-center p-8 '>
				<h1 className='text-2xl text-center'>No Purchase History</h1>
				<Link href='/grocery' className='text-green-500  hover:underline mt-2 '>
					Shop Now
				</Link>
			</section>
		);
	}
	return (
		<section className=''>
			{/* <p className='text-green-900'>Purchase History</p> */}
			<ul className='w-full'>
				{invoiceData.invoices.map((invoice) => {
					return (
						<li
							key={invoice.code}
							className='bg-olive-100 rounded-lg p-4 cursor-pointer hover:bg-olive-200'
						>
							<Link href={`/invoices/${invoice.code}`}>
								<p className='text-green-900 font-bold mb-2 text-lg'>
									{dateFormatter(invoice.process_date)}
									|| ${invoice.total} || {invoice.products.length} item
									{invoice.products.length > 1 ? "s" : ""}
								</p>
								<p>
									{
										invoice.products.map((product) => {
											return (
												<span key={product.id}>
													{product.product_name} x{product.quantity}{" "}
												</span>
											);
										})
										// .join(", ")
									}
								</p>
							</Link>
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default PurchaseHistory;
