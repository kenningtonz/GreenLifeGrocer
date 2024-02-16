import product from "@/app/product.module.css"
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ name, cost, brand, upc }) => {
    return (
        <Link className={`${product.card} card child25`}
            href={`/products/product`}
        >
            <Image src={`/images/products/${upc}.jpg`} alt={name} width={175} height={100} />
            <h3>{name}</h3>
            <h4>{brand}</h4>
            <span>
                <p>${cost}</p>
                <button className="button" >Add to Cart</button>
            </span>
        </Link>
    )
}

export default ProductCard