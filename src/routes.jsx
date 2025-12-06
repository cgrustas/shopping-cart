import App from "./App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import HomePage from "./components/HomePage/HomePage";
import ShopPage from "./components/ShopPage/ShopPage";
import CartPage from "./components/CartPage/CartPage";

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
