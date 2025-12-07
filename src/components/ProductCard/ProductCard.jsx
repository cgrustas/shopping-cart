import { useState } from "react";
import ItemCounter from "../ItemCounter/ItemCounter";
import styles from "./ProductCard.module.css";

export default function ProductCard({
  id,
  title,
  price,
  image,
  onAddToCartClick,
}) {
  const [quantity, setQuantity] = useState(1);

  function handleQuantityChange(e) {
    let value = e.target.value;
    if (value === "") setQuantity("");
    else {
      value = Number(value);
      value <= 1 ? setQuantity(1) : setQuantity(value);
    }
  }

  function handleIncrementClick() {
    if (!quantity) setQuantity(1);
    setQuantity(quantity + 1);
  }

  function handleDecrementClick() {
    if (!quantity) setQuantity(1);
    if (quantity <= 1) return;

    setQuantity(quantity - 1);
  }

  return (
    <article className={styles.card}>
      <img className={styles.img} src={image} alt="" />
      <h3 className={styles.title}>{title}</h3>
      <ItemCounter
        quantity={quantity}
        onQuantityChange={(event) => handleQuantityChange(event)}
        onIncrementClick={handleIncrementClick}
        onDecrementClick={handleDecrementClick}
      />
      <div className={styles.cardFooter}>
        <p className={styles.price}>{price.toFixed(2)}</p>
        <button
          className={styles.addToCartBtn}
          onClick={() => {
            onAddToCartClick(id, quantity);
            setQuantity(1);
          }}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
