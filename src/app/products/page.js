import ProductCard from "@/components/productCard";
import Breadcrumbs from '@/components/breadcrumbs';

let departments = [
    { name: "Produce" },
    { name: "Pantry" },
    { name: "Bakery" },
    { name: "Dairy & Eggs" },
    { name: "Meat & Seafood" },
    { name: "Frozen" },
    { name: "Household" },
    { name: "Health & Beauty" },
    { name: "Other" }
]

let subDepartments = [
    { name: "Baking" },
    { name: "Canned" },
    { name: "Cereal" },
    { name: "Dry" },
    { name: "Pasta" },
    { name: "Spices" },
    { name: "Snacks" }
]

export default function Products() {
    return (
        <main>
            <ul className="productsNav">
                {
                    departments.map(department => {
                        return (
                            <li key={department.name}><a href={`#/department/${department.name}`}>{department.name}</a></li>
                        )
                    })
                }
            </ul>
            <ul className="productsNav">
                {
                    subDepartments.map(subDepartment => {
                        return (
                            <li key={subDepartment.name}><a href={`#/department/${subDepartment.name}`}>{subDepartment.name}</a></li>
                        )
                    })
                }
            </ul>

            <section class="flex spaceBetween p1">
                {/* <Breadcrumbs
                    containerClasses='flex py-5 bg-gradient-to-r from-purple-600 to-blue-600'
                /> */}
                <section class="breadCrumbs">
                    <span className="text24 flex">
                        <p >Products </p>
                        <p className="px1">||</p>
                        <p >Pantry</p>
                    </span>
                    <h2 className="text32">Baking Supplies</h2>
                </section>
                <section>

                    <div className="searchBar" >
                        <input type="text" placeholder="Search.." name="search" />
                        <button type="submit">S</button>
                    </div>
                    <div class="sortBy"></div>
                </section>

            </section>

            <section class="flex wrap gap1 p1">
                <ProductCard upc="16000329904" name="Frosting, Butter Cream" cost="2.99" brand="Betty Crocker" />
                <ProductCard upc="34000146000" name="Milk Chocolate Chips" cost="2.99" brand="Hershey's" />
                <ProductCard upc="43000253403" name="Baking Chocolate Squares, Semi-Sweet" cost="2.99" brand="Baker's" />
                <ProductCard upc="16000409897" name="Cake Mix, Chocolate Fudge" cost="2.99" brand="Betty Crocker" />
                <ProductCard upc="16000409910" name="Cake Mix, French Vanilla" cost="2.99" brand="Betty Crocker" />
                <ProductCard upc="34000141340" name="Chocolate Chips, Sugar Free" cost="2.99" brand="Betty Crocker" />
                <ProductCard upc="43000254196" name="Pie Crust, Grahams" cost="2.99" brand="Baker's" />
                <ProductCard upc="44000048334" name="White Chocolate Chunks" cost="2.99" brand="Honey Maid" />
            </section>
        </main>

    )
}