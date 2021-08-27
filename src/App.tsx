import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Cart } from "./components/Cart/Cart";
import { ProductList } from "./components/ProductList/ProductList";
import { Grocery } from "./shared/models/grocery";

// Create a client
const queryClient = new QueryClient();

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as Grocery[]);
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div className="App" data-testid="App">
        Mimacom
        <ProductList />
        <Cart />
      </div>
    </QueryClientProvider>
  );
}

export default App;
