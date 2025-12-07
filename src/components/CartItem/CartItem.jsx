import ItemCounter from "../ItemCounter/ItemCounter";
import styles from "./CartItem.module.css";

export default function CartItem({
  cartItem,
  onQuantityIncrementClick,
  onQuantityDecrementClick,
  onQuantityChange,
  onRemoveClick,
}) {
  const { title, price, image, quantity } = cartItem;

  return (
    <article className={styles.cartItem}>
      <img className={styles.img} src={image} alt="" />
      <h3 className={styles.title}>{title}</h3>
      <ItemCounter
        quantity={quantity}
        onIncrementClick={onQuantityIncrementClick}
        onDecrementClick={onQuantityDecrementClick}
        onQuantityChange={onQuantityChange}
      />
      <div className={styles.cardFooter}>
        <p className={styles.price}>${price.toFixed(2)}</p>
        <button className={styles.removeFromCartBtn} onClick={onRemoveClick}>
          Remove
        </button>
      </div>
    </article>
  );
}
