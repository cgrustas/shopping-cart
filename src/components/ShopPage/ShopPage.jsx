import { useOutletContext } from "react-router";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ShopPage.module.css";

export default function ShopPage() {
  const { products, error, loading, onAddToCartClick } = useOutletContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <div className={styles.shopPage}>
      <h2 className={styles.title}>Shop</h2>
      <section className={styles.products}>
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCartClick={onAddToCartClick}
            />
          );
        })}
      </section>
    </div>
  );
}
