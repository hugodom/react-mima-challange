import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";
import { ProductList } from "./ProductList";
import { renderWithClient } from "../../tests/utils";
import { server } from "../../setupTests";

test("Renders with a success call", async () => {
  renderWithClient(<ProductList />);
  expect(await screen.findByText("Unbranded Metal Chair")).toBeTruthy();
  expect(screen.findByText("Handcrafted Metal Towels")).toBeTruthy();

  // Are there favorited elements?
  expect(screen.queryByLabelText("Favorited")).toBeTruthy();

  // Toggle a favorite
  // @ts-ignore
  fireEvent.click(screen.queryByLabelText("Favorited"));
  expect(screen.queryByLabelText("Favorited")).not.toBeTruthy();

  // Toggle a non favorite
  fireEvent.click(screen.queryAllByLabelText("Not favorited")[0]);
  expect(screen.queryAllByLabelText("Not favorited")).toBeTruthy();

  // Add to cart
  expect(screen.findByText("Stock: 2")).toBeTruthy();
  fireEvent.click(screen.queryAllByTestId("card-action-area")[0]);
  expect(screen.findByText("Stock: 1")).toBeTruthy();
  // Make sure not more elements can be added
  fireEvent.click(screen.queryAllByTestId("card-action-area")[0]);
  expect(screen.findByText("Stock: 1")).toBeTruthy();
});

test("Renders with a failure call", async () => {
  server.use(rest.get("*", (req, res, ctx) => res(ctx.status(500))));
  renderWithClient(<ProductList />);
  expect(await screen.findByText("Error fetching data")).toBeTruthy();
});

test("Correctly renders Component while loading", () => {
  renderWithClient(<ProductList />);
  expect(screen.findByText("Loading...")).toBeTruthy();
});
