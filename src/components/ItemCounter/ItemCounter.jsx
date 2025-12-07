import styles from "./ItemCounter.module.css";

export default function ItemCounter({
  quantity,
  onQuantityChange,
  onIncrementClick,
  onDecrementClick,
}) {
  return (
    <div className={styles.itemCounter}>
      <div className={styles.quantityInputGroup}>
        <label htmlFor="quantity">Quantity: </label>
        <input
          className={styles.quantityInput}
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={quantity}
          onChange={onQuantityChange}
        />
      </div>
      <div className={styles.quantityBtns}>
        <button
          className={styles.quantityBtn}
          aria-label="Increment quantity"
          onClick={onIncrementClick}
        >
          +
        </button>
        <button
          className={styles.quantityBtn}
          aria-label="Decrement quantity"
          onClick={onDecrementClick}
        >
          -
        </button>
      </div>
    </div>
  );
}
