import React from "react";
import { act, render, screen } from "@testing-library/react";
import actualCreate from "zustand";
import { Cart } from "./Cart";

test("Correctly renders Component", () => {
  render(<Cart />);
  expect(screen.getByTestId("Cart")).toBeTruthy();
});
