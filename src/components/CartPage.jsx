import { useOutletContext } from "react-router";
import CartItem from "./CartItem";

export default function CartPage() {
  const {
    cartItems,
    loading,
    error,
    onRemoveFromCartClick,
    onCartQuantityIncrementClick,
    onCartQuantityDecrementClick,
    onCartQuantityChange,
  } = useOutletContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((cartItem) => {
          return (
            <CartItem
              key={cartItem.id}
              cartItem={cartItem}
              onRemoveClick={() => onRemoveFromCartClick(cartItem.id)}
              onQuantityIncrementClick={() =>
                onCartQuantityIncrementClick(cartItem.id)
              }
              onQuantityDecrementClick={() =>
                onCartQuantityDecrementClick(cartItem.id)
              }
              onQuantityChange={(event) =>
                onCartQuantityChange(event, cartItem.id)
              }
            />
          );
        })
      ) : (
        <h3>Your cart is empty</h3>
      )}
    </div>
  );
}
