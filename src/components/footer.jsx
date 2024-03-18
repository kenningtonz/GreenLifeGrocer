import Image from "next/image";
import "@/css/footer.css";
import Link from "next/link";

const Footer = () => {
	return (
		<>
			<footer className='footer p-10 bg-green-900 text-green-100'>
				<nav>
					<h6 className='footer-title'>Departments</h6>
					<Link href={"/departments/produce"} className='link link-hover'>
						Produce
					</Link>
					<a className='link link-hover'>Meat</a>
					<a className='link link-hover'>Pantry</a>
					<a className='link link-hover'>Dairy & Eggs</a>
					<a className='link link-hover'>Bakery</a>
					<a className='link link-hover'>Frozen</a>
					<a className='link link-hover'>Household</a>
					<a className='link link-hover'>Health & Beauty</a>
					<a className='link link-hover'>Other</a>
				</nav>
				<nav>
					<h6 className='footer-title'>Account</h6>
					<a className='link link-hover'>My Account</a>
					<a className='link link-hover'>Cart</a>
					<a className='link link-hover'>Sign In</a>
				</nav>
			</footer>
			<footer className='footer px-10 py-4 border-t bg-green-900 text-green-100 border-green-600'>
				<aside className='items-center grid-flow-col '>
					<Image src='/images/logo.png' alt='logo' width={50} height={50} />
					<p>
						GreenLife Grocer &copy; 2024 <br />
						Nourishing You Body, Nurturing the Planet
					</p>
				</aside>
			</footer>
		</>
	);
};

export default Footer;

// <footer className="footer">
//     <span className="flex">
//         <section className="child50">
//             <p>GreenLife Grocer</p>
//             <p>Nourishing You Body, Nurturing the Planet</p>
//         </section>
//         <section className="flex child30">
//             <section>
//                 <p>Departments</p>
//                 <ul className="flex wrap">
//                     <li><a>Produce</a></li>
//                     <li><a>Meat</a></li>
//                     <li><a>Dairy & Eggs</a></li>
//                     <li><a>Bakery</a></li>
//                     <li><a>Pantry</a></li>
//                     <li><a>Frozen</a></li>
//                     <li><a>Household</a></li>
//                     <li><a>Health & Beauty</a></li>
//                     <li><a>Other</a></li>
//                 </ul>
//             </section>

//             <section>
//                 <p>Account</p>
//                 <ul className="flex wrap">
//                     <li><a>Sign In</a></li>
//                     <li><a>Cart</a></li>
//                     <li><a>My Account</a></li>

//                 </ul>
//             </section>
//         </section>
//     </span>

//     <p className="copyright"></p>
// </footer>
