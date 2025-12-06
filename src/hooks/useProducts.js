import { useState, useEffect } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) =>
        setProducts(
          response.map((product) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
          }))
        )
      )
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { products, error, loading };
}
