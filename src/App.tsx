import React from "react";
import "./App.css";
import { ProductList } from "./components/ProductList/ProductList";

function App() {
  return (
    <div className="App" data-testid="App">
      Mimacom
      <ProductList />
    </div>
  );
}

export default App;
