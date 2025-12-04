import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter } from "react-router";
import routes from "../src/routes";
import { RouterProvider } from "react-router";
import { userEvent } from "@testing-library/user-event";

describe("routing behavior", () => {
  test("home page shows on initial render", () => {
    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("heading", { name: /about us/i })
    ).toBeInTheDocument();
  });

  describe("page navigation", () => {
    test("displays shop page when user clicks 'shop' link", async () => {
      const router = createMemoryRouter(routes);
      render(<RouterProvider router={router} />);
      const user = userEvent.setup();
      const shopLink = screen.getByRole("link", { name: /shop/i });

      await user.click(shopLink);

      expect(
        screen.getByRole("heading", { name: /shop/i })
      ).toBeInTheDocument();
    });

    test("displays cart page when user clicks 'cart' link", async () => {
      const router = createMemoryRouter(routes);
      render(<RouterProvider router={router} />);
      const user = userEvent.setup();
      const homeLink = screen.getByRole("link", { name: /cart/i });

      await user.click(homeLink);

      expect(
        screen.getByRole("heading", { name: /cart/i })
      ).toBeInTheDocument();
    });

    test("displays home page when user navigates away and clicks 'home' link", async () => {
      const router = createMemoryRouter(routes);
      render(<RouterProvider router={router} />);
      const user = userEvent.setup();
      const shopLink = screen.getByRole("link", { name: /shop/i });

      await user.click(shopLink);
      expect(
        screen.queryByRole("heading", { name: /about us/i })
      ).not.toBeInTheDocument();

      const homeLink = screen.getByRole("link", { name: /home/i });
      await user.click(homeLink);

      expect(
        screen.getByRole("heading", { name: /about us/i })
      ).toBeInTheDocument();
    });
  });

  describe("error handling", () => {
    test("error page appears on an invalid route", () => {
      const router = createMemoryRouter(routes, {
        initialEntries: ["/invalid-route"],
      });

      render(<RouterProvider router={router} />);

      expect(
        screen.getByRole("heading", { name: /error/i })
      ).toBeInTheDocument();
    });
  });
});
