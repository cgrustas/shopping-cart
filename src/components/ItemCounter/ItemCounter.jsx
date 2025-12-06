export default function ItemCounter({
  quantity,
  onQuantityChange,
  onIncrementClick,
  onDecrementClick,
}) {
  return (
    <div className="item-counter">
      <div className="quantity-input-group">
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={quantity}
          onChange={onQuantityChange}
        />
      </div>
      <div className="quantity-btns">
        <button
          className="increment"
          aria-label="Increment quantity"
          onClick={onIncrementClick}
        >
          ⌃
        </button>
        <button
          className="decrement"
          aria-label="Decrement quantity"
          onClick={onDecrementClick}
        >
          ⌄
        </button>
      </div>
    </div>
  );
}
