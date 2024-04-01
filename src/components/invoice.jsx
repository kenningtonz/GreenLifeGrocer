import { dateFormatter } from "@/lib/utils/dateFormatter";
const Invoice = ({ invoice }) => {
	return (
		<section className=' card  flex flex-col w-full gap-2 h-fit m-auto max-w-[1200px]'>
			<div className='w-full p-2 '>
				<strong className='text-green-800 text-2xl'>Invoice ID: </strong>
				<p className='mb-2 text-xl break-words '>{invoice.code}</p>
				<strong className='text-green-800 text-2xl'>Order Date: </strong>
				<p className='mb-2 text-xl'>{dateFormatter(invoice.process_date)}</p>
			</div>

			<div
				aria-hidden={true}
				className='h-[2px] my-4 bg-olive/50  mx-2 w-full'
			></div>

			<section className='flex gap-12  w-full flex-wrap p-2 '>
				<div>
					<h3 className='text-2xl text-green-800 font-semibold'>Contact Info:</h3>

					<p className='mb-2 text-lg'>{invoice.email}</p>

					<p className='text-lg'>{invoice.shipping_phone}</p>
				</div>
				<div>
					<h3 className='text-2xl text-green-800 font-semibold'>Shipped To:</h3>
					<p className='text-lg'>
						{invoice.shipping_name_first} {invoice.shipping_name_last}
					</p>
					<p className='text-lg'>{invoice.shipping_address}</p>
					<p className='text-lg'>
						{invoice.shipping_city} , {invoice.shipping_province} ,{" "}
						{invoice.shipping_postal_code}
					</p>
				</div>
				<div>
					<h3 className='text-2xl text-green-800 font-semibold'>Billed To:</h3>
					<p className='text-lg'>
						{invoice.billing_name_first} {invoice.billing_name_last}
					</p>
					<p className='text-lg'>{invoice.billing_address}</p>
					<p className='text-lg'>
						{invoice.billing_city} , {invoice.billing_province} ,{" "}
						{invoice.billing_postal_code}
					</p>
				</div>
			</section>
			<div
				aria-hidden={true}
				className='h-[2px] my-4 bg-olive/50 w-full mx-2'
			></div>

			<table className='w-full'>
				<thead className='text-green-900 font-bold text-left text-lg '>
					<tr>
						<th className='p-2'>Product</th>
						<th className='p-2'>Quantity</th>
						<th className='p-2'>Price</th>
						<th className='p-2 sm:table-cell hidden'>Taxed</th>
					</tr>
				</thead>
				<tbody>
					{invoice.products.map((product, index) => (
						<tr key={`${product.product_name}-${index}`}>
							<td className='p-2'>{product.product_name}</td>
							<td className='p-2'>{product.quantity}</td>
							<td className='p-2'>${product.avg_price * product.quantity}</td>
							<td className='p-2 sm:table-cell hidden'>
								{product.taxable == 0 ? "Y" : "N"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div
				aria-hidden={true}
				className='h-[1px] my-1 bg-olive/50 mx-2 w-full'
			></div>

			<section className='flex flex-col gap-1 max-w-sm mb-4 self-end w-full p-2'>
				<span className='flex justify-between'>
					<p className='text-lg text-green-900/80 '>Subtotal:</p>
					<p className='text-lg text-green-900/80 '>${invoice.sub_total}</p>
				</span>
				<span className='flex justify-between'>
					<p className='text-lg text-green-900/80 '>Tax:</p>
					<p className='text-lg text-green-900/80 '>${invoice.tax}</p>
				</span>
				<span className='flex justify-between'>
					<p className='text-xl font-bold text-green-900'>Total:</p>
					<p className='text-xl font-bold text-green-900'>${invoice.total}</p>
				</span>
			</section>
		</section>
	);
};

export default Invoice;
