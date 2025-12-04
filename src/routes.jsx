import App from "./App";
import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/HomePage";
import ShopPage from "./components/ShopPage";
import CartPage from "./components/CartPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
];

export default routes;
