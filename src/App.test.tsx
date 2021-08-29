import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { renderWithClient } from "./tests/utils";

test("Creates App correctly with render with client", async () => {
  renderWithClient(<App />);
  expect(await screen.getByTestId("App")).toBeTruthy();
});
