import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductItem } from "./ProductItem";

test("Correctly renders Component", () => {
  render(<ProductItem />);
  expect(screen.getByTestId("ProductItem")).toBeTruthy();
});
