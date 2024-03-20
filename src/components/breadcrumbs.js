import Link from "next/link";

const Breadcrumbs = ({ sameSize, paths, className }) => {
	// const paths = usePathname();
	const pathURLs = paths.map((path) => path[1]);

	// const newPathNames = pathNames.unshift("home");
	let separator = (
		<span className='mx-2 text-green-900/50 font-bold'> &#62; </span>
	);
	let linkClasses =
		"focus-visible:outline-none flex cursor-pointer items-center [@media(hover:hover)]:hover:underline focus:outline-none";
	return (
		<div className={` text-sm max-w-full ${className} text-green-800`}>
			<ul
				key={"breadcrumbs"}
				className='min-h-min flex flex-wrap items-center whitespace-nowrap gap-y-2'
			>
				<li key={"home-breadcrumb"} className='flex items-center'>
					<Link href={"/"} className={`${linkClasses}`}>
						Home
					</Link>
					{separator}
				</li>
				{paths.map((path, index) => {
					let href = `/${pathURLs.slice(0, index + 1).join("/")}`;

					return (
						<>
							<li
								key={`${path.url}-breadcrumb`}
								className={`${
									index == paths.length - 1 && !sameSize
										? " w-full font-bold text-xl text-green-900 flex100"
										: index == paths.length - 1
										? "text-green-900"
										: null
								} flex items-center`}
							>
								<Link className={`${linkClasses}`} href={href}>
									{path[0]}
								</Link>
							</li>
							{index < paths.length - 1 ? separator : null}
						</>
					);
				})}
			</ul>
		</div>
	);
};

export default Breadcrumbs;
