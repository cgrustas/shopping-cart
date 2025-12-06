import ItemCounter from "../ItemCounter/ItemCounter";

export default function CartItem({
  cartItem,
  onQuantityIncrementClick,
  onQuantityDecrementClick,
  onQuantityChange,
  onRemoveClick,
}) {
  const { title, price, image, quantity } = cartItem;

  return (
    <article className="cart-item">
      <img src={image} alt="" />
      <h3>{title}</h3>
      <p>{price}</p>
      <ItemCounter
        quantity={quantity}
        onIncrementClick={onQuantityIncrementClick}
        onDecrementClick={onQuantityDecrementClick}
        onQuantityChange={onQuantityChange}
      />
      <button className="remove-from-cart" onClick={onRemoveClick}>
        Remove
      </button>
    </article>
  );
}
