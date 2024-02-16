'use client';
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Breadcrumbs = () => {
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)
    let separator = <span className="mx-2"> || </span>
    return (
        <div>
            <ul className="flex">
                {
                    pathNames.map((link, index) => {
                        let href = `/${pathNames.slice(0, index + 1).join('/')}`
                        let itemLink = link[0].toUpperCase() + link.slice(1, link.length);
                        return (
                            <>
                                <li key={index} className="hover:underline mx-2 font-bold" >
                                    <Link href={href}>{itemLink}</Link>
                                </li>
                                {pathNames.length !== index + 1 && separator}
                            </>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Breadcrumbs;