// import product from "./product.module.css"
import Image from "next/image"

export default function Product() {
    let name = "Frosting, Butter Cream"
    let brand = "Betty Crocker"
    let cost = "2.99"
    let image = "/images/products/16000329904.jpg"
    let rating = 4;
    let description = "Artificially flavored. Visit BettyCrocker.com/Birthdays for creative ideas and more. Betty Crocker Kitchens Tested & Approved: Each Betty Crocker product promises delicious homemade taste every time. Carbohydrate Choices: 1. Gluten free."

    return (
        <main className="BGgreen flex gap1 wrap  p1 spaceBetween">

            <Image className="child50 img" src={image} alt={name} width={200} height={200} />
            <section className="child50 p1 card flex flexCol spaceBetween">
                <h1 className="text28">{name}</h1>
                <h2 className="text20">{brand}</h2>
                <span className="flex">
                    {new Array(rating).fill(0).map((_, index) => {
                        return (
                            <Image key={index} src="/images/star.svg" alt="star" width={20} height={20} />
                        )
                    })}
                </span>

                <p className="textRight text32">${cost}</p>
                <span className="flex spaceBetween">
                    <div className="quantityButton">
                        <button>-</button>
                        <p>1</p>
                        <button>+</button>
                    </div>
                    <button className="button">Add to Cart</button>
                </span>
            </section>
            <section className="child100 card p1">
                <p>{description}</p>
            </section>

        </main>
    )

}