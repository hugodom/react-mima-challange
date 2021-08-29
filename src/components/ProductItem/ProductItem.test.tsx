import React from "react";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-test-renderer";
import { ProductItem } from "./ProductItem";

const grocery = {
  id: "7ac6d979-0771-4b8c-809d-eb8aa36be7f4",
  image_url:
    "https://dummyimage.com/400x400/61cc38/000&text=Awesome Plastic Towels",
  stock: 2,
  productName: "Awesome Plastic Towels",
  price: 93,
  productDescription:
    "Earum voluptates animi excepturi sed dolor nemo. Ab sed magnam modi saepe et est optio dolorum. Eum pariatur dolor voluptatibus. Ut magnam omnis. Culpa nisi provident cumque libero.",
  favorite: 0,
};

const favoritedGrocery = {
  id: "7ac6d979-0771-4b8c-809d-eb8aa36be7f4",
  image_url:
    "https://dummyimage.com/400x400/61cc38/000&text=Awesome Plastic Towels",
  stock: 2,
  productName: "Awesome Plastic Towels",
  price: 93,
  productDescription:
    "Earum voluptates animi excepturi sed dolor nemo. Ab sed magnam modi saepe et est optio dolorum. Eum pariatur dolor voluptatibus. Ut magnam omnis. Culpa nisi provident cumque libero.",
  favorite: 1,
};

const handleFunction = jest.fn();
const toggleItem = jest.fn();

test("Correctly renders Component", async () => {
  render(
    <ProductItem
      grocery={grocery}
      handleClick={handleFunction}
      toggleItemFavorite={toggleItem}
    />
  );

  expect(screen.getByTestId("ProductItem")).toBeTruthy();
  expect(screen.getByLabelText("Not favorited")).toBeTruthy();
  expect(screen.queryByLabelText("Favorited")).not.toBeInTheDocument();
});

test("Correctly renders a favorite Component", () => {
  render(
    <ProductItem
      grocery={favoritedGrocery}
      handleClick={handleFunction}
      toggleItemFavorite={toggleItem}
    />
  );
  expect(screen.getByTestId("ProductItem")).toBeTruthy();
  expect(screen.queryByLabelText("Not favorited")).not.toBeInTheDocument();
  expect(screen.queryByLabelText("Favorited")).toBeTruthy();

  expect(handleFunction).toHaveBeenCalledTimes(0);
  expect(toggleItem).toHaveBeenCalledTimes(0);

  fireEvent.click(screen.queryByLabelText("Favorited"));
  expect(toggleItem).toHaveBeenCalledTimes(1);

  // Test that the button does not exist
  expect(screen.queryByLabelText("Add button")).not.toBeTruthy();

  fireEvent.click(screen.queryByTestId("card-action-area"));
  expect(handleFunction).toHaveBeenCalledTimes(1);
});
