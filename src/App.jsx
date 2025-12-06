import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router";
import useProducts from "./hooks/useProducts";
import { useState } from "react";
import styles from "./App.module.css";

export default function App() {
  const { products, error, loading } = useProducts();
  const [cart, setCart] = useState([]);
  const cartItems = cart.map((cartEntry) => {
    const product = products.find((product) => product.id === cartEntry.id);
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: cartEntry.quantity,
    };
  });

  function handleAddToCartClick(id, quantity) {
    if (!quantity) quantity = 1;

    let newCart;
    const duplicateProduct = cart.find((product) => product.id === id);

    if (duplicateProduct) {
      newCart = cart.map((product) => {
        if (product === duplicateProduct) {
          return {
            id: product.id,
            quantity: product.quantity + quantity,
          };
        } else {
          return product;
        }
      });
    } else {
      newCart = [...cart, { id, quantity }];
    }
    setCart(newCart);
  }

  function handleRemoveFromCartClick(id) {
    const newCart = cart.filter((cartEntry) => cartEntry.id !== id);
    setCart(newCart);
  }

  function handleCartQuantityIncrementClick(id) {
    const newCart = cart.map((cartEntry) => {
      if (cartEntry.id === id) {
        return {
          ...cartEntry,
          quantity: cartEntry.quantity + 1,
        };
      } else {
        return cartEntry;
      }
    });
    setCart(newCart);
  }

  function handleCartQuantityDecrementClick(id) {
    const newCart = cart.map((cartEntry) => {
      if (cartEntry.id === id) {
        if (cartEntry.quantity <= 1) {
          return cartEntry;
        }

        return {
          ...cartEntry,
          quantity: cartEntry.quantity - 1,
        };
      }
      return cartEntry;
    });
    setCart(newCart);
  }

  function handleCartQuantityChange(event, id) {
    let value = event.target.value;
    if (value === "") value = "";
    else {
      value = Number(value);
      if (value <= 1) value = 1;
    }

    const newCart = cart.map((cartEntry) => {
      if (cartEntry.id === id) {
        return {
          ...cartEntry,
          quantity: value,
        };
      } else {
        return cartEntry;
      }
    });
    setCart(newCart);
  }

  return (
    <div className={styles.appContainer}>
      <header>
        <NavBar numCartItems={cartItems.length} />
      </header>
      <main>
        <Outlet
          context={{
            products,
            error,
            loading,
            onAddToCartClick: handleAddToCartClick,
            onRemoveFromCartClick: handleRemoveFromCartClick,
            onCartQuantityIncrementClick: handleCartQuantityIncrementClick,
            onCartQuantityDecrementClick: handleCartQuantityDecrementClick,
            onCartQuantityChange: handleCartQuantityChange,
            cartItems,
          }}
        />
      </main>
    </div>
  );
}
