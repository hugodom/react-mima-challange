/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Grid } from "@material-ui/core";
import { Cart } from "./components/Cart/Cart";
import { MobileHeader } from "./components/MobileHeader/MobileHeader";
import { ProductList } from "./components/ProductList/ProductList";
import useStore, { GlobalState } from "./state/items.state";

// Create a client
const queryClient = new QueryClient();

function App() {
  const { cartOpen, setMobileView, mobileView }: GlobalState = useStore();

  useEffect(() => {
    function resizeScreen() {
      window.innerWidth < 600 ? setMobileView(true) : setMobileView(false);
    }

    window.addEventListener("resize", resizeScreen);

    return () => {
      window.removeEventListener("resize", resizeScreen);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div className="App" data-testid="App">
        {mobileView ? <MobileHeader /> : null}
        <Grid container direction="row">
          {(!mobileView || (mobileView && !cartOpen)) && (
            <Grid item sm={10}>
              <ProductList />
            </Grid>
          )}
          {(!mobileView || (mobileView && cartOpen)) && (
            <Grid item xs={12} sm={2}>
              <Cart />
            </Grid>
          )}
        </Grid>
      </div>
    </QueryClientProvider>
  );
}

export default App;
