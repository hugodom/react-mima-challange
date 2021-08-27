import React from "react";
import { render, screen } from "@testing-library/react";
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

test("Correctly renders Component", () => {
  render(<ProductItem grocery={grocery} />);
  expect(screen.getByTestId("ProductItem")).toBeTruthy();
});
