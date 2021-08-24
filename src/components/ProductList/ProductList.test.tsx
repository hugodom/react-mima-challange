import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductList } from "./ProductList";

test("Correctly renders Component", () => {
  render(<ProductList />);
  expect(screen.getByTestId("ProductList")).toBeTruthy();
});
