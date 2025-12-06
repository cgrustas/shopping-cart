import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter } from "react-router";
import routes from "../src/routes";
import { RouterProvider } from "react-router";
import { userEvent } from "@testing-library/user-event";

globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve([
        {
          id: 0,
          title: "Test Product 1",
          price: 10.0,
          image: "test-product-1.png",
        },
        {
          id: 1,
          title: "Test Product 2",
          price: 11.0,
          image: "test-product-2.png",
        },
      ]),
  })
);

function renderApp() {
  const router = createMemoryRouter(routes);
  render(<RouterProvider router={router} />);
  return userEvent.setup();
}

async function setupShopPage(user) {
  const shopLink = screen.getByRole("link", { name: /shop/i });
  await user.click(shopLink);
}

async function addFirstProductToCart(user) {
  const addToCartButtons = await screen.findAllByRole("button", {
    name: /add to cart/i,
  });
  const addToCartButton = addToCartButtons[0];

  await user.click(addToCartButton);
}

async function removeFirstProductFromCart(user) {
  const removeButtons = await screen.findAllByRole("button", {
    name: /Remove/i,
  });
  const removeButton = removeButtons[0];

  await user.click(removeButton);
}

async function navigateToCartPage(user) {
  const cartLink = screen.getByRole("link", { name: /cart/i });
  await user.click(cartLink);
}

async function getFirstQuantityInput() {
  const quantities = await screen.findAllByRole("spinbutton");
  const quantity = quantities[0];
  return quantity;
}

async function incrementFirstProduct(user) {
  const incrementButtons = await screen.findAllByRole("button", {
    name: /increment quantity/i,
  });
  const incrementButton = incrementButtons[0];

  await user.click(incrementButton);
}

async function decrementFirstProduct(user) {
  const decrementButtons = await screen.findAllByRole("button", {
    name: /decrement quantity/i,
  });
  const decrementButton = decrementButtons[0];

  await user.click(decrementButton);
}

describe("add-to-cart behavior", () => {
  test("adding an item updates the cart page", async () => {
    const user = renderApp();
    await setupShopPage(user);

    await addFirstProductToCart(user);

    await navigateToCartPage(user);
    const productHeading = screen.getByRole("heading", {
      name: /test product 1/i,
    });

    expect(productHeading).toBeInTheDocument();
  });

  test("adding an item updates the navbar's cart indicator", async () => {
    const user = renderApp();
    await setupShopPage(user);

    await addFirstProductToCart(user);

    const cartLink = screen.getByRole("link", { name: /cart/i });
    expect(cartLink).toHaveTextContent(/Cart \(1\)/i);
  });

  test("adding a duplicate increases quantity instead of creating a new entry", async () => {
    const user = renderApp();
    await setupShopPage(user);

    await addFirstProductToCart(user);
    await addFirstProductToCart(user);
    await addFirstProductToCart(user);

    await navigateToCartPage(user);
    const cartLink = screen.getByRole("link", { name: /cart/i });
    const quantityInput = await getFirstQuantityInput();

    expect(cartLink).toHaveTextContent(/Cart \(1\)/i);
    expect(quantityInput).toHaveValue(3);
  });

  test("adding distinct items creates separate cart entries", async () => {
    const user = renderApp();
    await setupShopPage(user);
    const addToCartButtons = await screen.findAllByRole("button", {
      name: /add to cart/i,
    });

    await user.click(addToCartButtons[0]);
    await user.click(addToCartButtons[1]);

    const cartLink = screen.getByRole("link", { name: /cart/i });
    expect(cartLink).toHaveTextContent(/Cart \(2\)/i);
  });
});

describe("remove-from-cart behavior", () => {
  test("remove-from-cart click removes item from the cart page", async () => {
    const user = renderApp();
    await setupShopPage(user);
    await addFirstProductToCart(user);
    await navigateToCartPage(user);
    expect(
      screen.getByRole("heading", {
        name: /Test Product 1/i,
      })
    ).toBeInTheDocument();

    await removeFirstProductFromCart(user);

    expect(
      screen.queryByRole("heading", {
        name: /Test Product 1/i,
      })
    ).not.toBeInTheDocument();
  });

  test("remove-from-cart click removes item from the navbar's cart indicator", async () => {
    const user = renderApp();
    await setupShopPage(user);
    await addFirstProductToCart(user);
    await navigateToCartPage(user);
    expect(screen.getByRole("link", { name: /cart/i })).toHaveTextContent(
      /Cart \(1\)/i
    );

    await removeFirstProductFromCart(user);

    expect(screen.getByRole("link", { name: /cart/i })).toHaveTextContent(
      /Cart \(0\)/i
    );
  });

  test("removing last item shows empty UI state", async () => {
    const user = renderApp();
    await setupShopPage(user);
    await addFirstProductToCart(user);
    await navigateToCartPage(user);
    expect(
      screen.queryByRole("heading", { name: /your cart is empty/i })
    ).not.toBeInTheDocument();

    await removeFirstProductFromCart(user);

    expect(
      screen.getByRole("heading", { name: /your cart is empty/i })
    ).toBeInTheDocument();
  });
});

describe("quantity selector behavior in shop page", () => {
  test("increment button increases quantity added to cart", async () => {
    const user = renderApp();
    await setupShopPage(user);

    await incrementFirstProduct(user); // 2
    await incrementFirstProduct(user); // 3
    await incrementFirstProduct(user); // 4
    await addFirstProductToCart(user);

    await navigateToCartPage(user);
    expect(await getFirstQuantityInput()).toHaveValue(4);
  });

  test("decrement button decreases quantity added to cart", async () => {
    const user = renderApp();
    await setupShopPage(user);

    await incrementFirstProduct(user); // 2
    await incrementFirstProduct(user); // 3

    await decrementFirstProduct(user); // 2

    await addFirstProductToCart(user);
    await navigateToCartPage(user);
    expect(await getFirstQuantityInput()).toHaveValue(2);
  });

  test("typing quantity sets quantity in cart", async () => {
    const user = renderApp();
    await setupShopPage(user);
    const shopInput = await getFirstQuantityInput();

    await user.clear(shopInput);
    await user.type(shopInput, "5");
    await addFirstProductToCart(user);

    await navigateToCartPage(user);
    const cartInput = await getFirstQuantityInput();

    expect(cartInput).toHaveValue(5);
  });

  test("quantity cannot go below 1 via decrement", async () => {
    const user = renderApp();
    await setupShopPage(user);
    const shopInput = await getFirstQuantityInput();

    await decrementFirstProduct(user);
    await decrementFirstProduct(user);

    expect(shopInput).toHaveValue(1);
  });

  test("quantity resets to 1 after adding to cart", async () => {
    const user = renderApp();
    await setupShopPage(user);
    const shopInput = await getFirstQuantityInput();
    await user.clear(shopInput);
    await user.type(shopInput, "5");
    expect(shopInput).toHaveValue(5);

    await addFirstProductToCart(user);

    expect(shopInput).toHaveValue(1);
  });
});

describe("quantity selector in cart page", () => {
  test("increment button increases quantity of cart item", async () => {
    const user = renderApp();
    await setupShopPage(user);
    await addFirstProductToCart(user);
    await navigateToCartPage(user);
    const cartInput = await getFirstQuantityInput();

    await incrementFirstProduct(user);
    await incrementFirstProduct(user);

    expect(cartInput).toHaveValue(3);
  });
  test("decrement button decreases quantity of cart item", async () => {
    const user = renderApp();
    await setupShopPage(user);
    await addFirstProductToCart(user);
    await navigateToCartPage(user);
    const cartInput = await getFirstQuantityInput();
    await incrementFirstProduct(user);
    await incrementFirstProduct(user);
    expect(cartInput).toHaveValue(3);

    await decrementFirstProduct(user);

    expect(cartInput).toHaveValue(2);
  });
  test("typing quantity sets quantity of cart item", async () => {
    const user = renderApp();
    await setupShopPage(user);
    await addFirstProductToCart(user);
    await navigateToCartPage(user);
    const cartInput = await getFirstQuantityInput();

    await user.clear(cartInput);
    await user.type(cartInput, "5");

    expect(cartInput).toHaveValue(5);
  });
  test("quantity cannot go below 1 via decrement", async () => {
    const user = renderApp();
    await setupShopPage(user);
    await addFirstProductToCart(user);
    await navigateToCartPage(user);
    const cartInput = await getFirstQuantityInput();
    expect(cartInput).toHaveValue(1);

    await decrementFirstProduct(user);
    await decrementFirstProduct(user);

    expect(cartInput).toHaveValue(1);
  });
});
