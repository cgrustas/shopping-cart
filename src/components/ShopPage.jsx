import { useOutletContext } from "react-router";
import ProductCard from "./ProductCard";

export default function ShopPage() {
  const { products, error, loading, onAddToCartClick } = useOutletContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <div className="shop-page">
      <h2>Shop</h2>
      <section className="products">
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
