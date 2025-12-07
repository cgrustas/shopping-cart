import { useOutletContext } from "react-router";
import CartItem from "../CartItem/CartItem";
import styles from "./CartPage.module.css";

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
    <div className={styles.cartPage}>
      <h2 className={styles.title}>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div className={styles.products}>
          {cartItems.map((cartItem) => {
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
          })}
        </div>
      ) : (
        <h3 className={styles.emptyCartMessage}>Your cart is empty</h3>
      )}
    </div>
  );
}
