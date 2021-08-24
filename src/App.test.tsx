import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Creates App correctly", () => {
  render(<App />);
  expect(screen.getByTestId("App")).toBeTruthy();
});
