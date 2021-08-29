import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProductList } from "./ProductList";

const queryClient = new QueryClient();

test("Correctly renders Component", async () => {
  render(
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <ProductList />
    </QueryClientProvider>
  );
  expect(screen.findByText("Loading...")).toBeTruthy();
});
