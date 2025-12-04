import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorPage from "../src/components/ErrorPage";

test("renders an error message", () => {
  render(<ErrorPage />);

  expect(screen.getByRole("heading", { name: /error/i })).toBeInTheDocument();
});
