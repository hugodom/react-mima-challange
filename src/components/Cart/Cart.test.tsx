import React from "react";
import { render, screen } from "@testing-library/react";
import { Cart } from "./Cart";

test("Correctly renders Component", () => {
  render(<Cart />);
  expect(screen.getByTestId("Cart")).toBeTruthy();
});
