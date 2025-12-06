import { useState } from "react";
import ItemCounter from "../ItemCounter/ItemCounter";

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
    <article className="product-card">
      <img src={image} alt="" />
      <h3>{title}</h3>
      <p>{price}</p>
      <ItemCounter
        quantity={quantity}
        onQuantityChange={(event) => handleQuantityChange(event)}
        onIncrementClick={handleIncrementClick}
        onDecrementClick={handleDecrementClick}
      />
      <button
        className="add-to-cart"
        onClick={() => {
          onAddToCartClick(id, quantity);
          setQuantity(1);
        }}
      >
        Add to Cart
      </button>
    </article>
  );
}
