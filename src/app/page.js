import styles from "./page.module.css";
import product from "./product.module.css"
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/productCard";

let departments = [
  { name: "Produce", image: "/images/departments/produce.png" },
  { name: "Pantry", image: "/images/departments/pantry.png" },
  { name: "Bakery", image: "/images/departments/bakery.png" },
  { name: "Dairy & Eggs", image: "/images/departments/dairyandeggs.png" },
  { name: "Meat & Seafood", image: "/images/departments/meat.png" },
  { name: "Frozen", image: "/images/departments/frozen.png" },
  { name: "Household", image: "/images/departments/household.png" },
  { name: "Health & Beauty", image: "/images/departments/health.png" },
  { name: "Other", image: "/images/departments/other.png" }
]

export default function Home() {
  return (
    <main className={styles.main}>
      <section className="hero">
        <Image src="/hero.png" alt="hero" width={1920} height={1080} />
      </section>
      <section className="flex alignCenter p1 hero2">
        <h2 className="fontSpecial text28 textRight child30">Nourishing Your Body, Nurturing the Planet</h2>
        <div className="child30 textCenter">
          <Image src="/images/logo.png" alt="logo" width={173} height={208} fill={false} />
        </div>
        <h1 className="child30 fontSpecial text32">GreenLife Grocer</h1>
      </section>
      <section className={`${product.featured} flex gap1`}>
        <h2 className="text32 textCenter child100">Featured Products</h2>
        <ProductCard upc="16000329904" name="Frosting, Butter Cream" cost="2.99" brand="Betty Crocker" />
        <ProductCard upc="34000146000" name="Milk Chocolate Chips" cost="2.99" brand="Hershey's" />
        <ProductCard upc="43000253403" name="Baking Chocolate Squares, Semi-Sweet" cost="2.99" brand="Baker's" />
        <ProductCard upc="16000409897" name="Cake Mix, Chocolate Fudge" cost="2.99" brand="Betty Crocker" />
      </section>

      <section className={`${styles.departments}`}>
        <h2 className="text32 textCenter">Departments</h2>
        <ul className="flex gap1 wrap">
          {
            departments.map(department => {
              return (
                <li className="child30 departmentCard" key={department.name}>
                  <Link href={`/departments/${department.name}`}>
                    <h3>{department.name}</h3>
                    <Image className="he" src={department.image} alt={department.name} width={480} height={300} />
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </section>

    </main>
  );
}
